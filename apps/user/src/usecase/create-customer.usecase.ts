import { Inject, Injectable } from '@nestjs/common';

import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { CreateUserInputDto } from '../dto/create-user-input.dto';
import { buildCustomerMapper } from '../mapper/build-customer.mapper';
import { ConfigService } from '@nestjs/config';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';

export interface ICreateCustomerUseCase {
  execute(user: CreateUserInputDto): Promise<void>;
}

export const CREATE_CUSTOMER_USE_CASE_TOKEN = Symbol(
  'CREATE_CUSTOMER_USE_CASE',
);

@Injectable()
export class CreateCustomerUseCase implements ICreateCustomerUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
    private configService: ConfigService,
  ) {}

  async execute(user: CreateUserInputDto): Promise<void> {
    const usersTableName = this.configService.get<string>('USERS_TABLE_NAME');

    this.logger.info('Creating customer');
    this.logger.debug('Customer information:', { user });

    const customer = buildCustomerMapper(user);

    const command = new PutCommand({
      TableName: usersTableName,
      Item: customer,
    });

    await this.database.putItem(command);

    this.logger.info('Customer has been created successfully');
  }
}

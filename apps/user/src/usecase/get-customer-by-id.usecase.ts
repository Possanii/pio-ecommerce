import { UserDto } from '../dto/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ILoggerClient, LOGGER_CLIENT_TOKEN } from '../client/logger.client';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '../client/dynamodb.client';
import { ConfigService } from '@nestjs/config';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

export interface IGetCustomerByIdUseCase {
  execute(id: string): Promise<UserDto>;
}

export const GET_CUSTOMER_BY_ID_USE_CASE_TOKEN = Symbol(
  'GET_CUSTOMER_BY_ID_USE_CASE',
);

@Injectable()
export class GetCustomerByIdUseCase implements IGetCustomerByIdUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
    private configService: ConfigService,
  ) {}

  async execute(id: string): Promise<UserDto | null> {
    const usersTableName = this.configService.get<string>('USERS_TABLE_NAME');

    this.logger.info('Getting customer by ID from the database', { id });

    const command = new GetCommand({
      TableName: usersTableName,
      Key: {
        id,
        type: 'CUSTOMER',
      },
    });

    const customer = await this.database.getItem(command);
    return customer.Item as UserDto | null;
  }
}

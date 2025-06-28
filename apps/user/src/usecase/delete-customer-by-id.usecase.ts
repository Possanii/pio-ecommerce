import { Inject, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { UserType } from '../dto/user-type.dto';
import {
  GET_CUSTOMER_BY_ID_USE_CASE_TOKEN,
  IGetCustomerByIdUseCase,
} from './get-customer-by-id.usecase';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';
import { TableName } from '@app/shared/src/constant/table-name.constant';

export interface IDeleteUserByIdUseCase {
  execute(id: string, type: UserType): Promise<void>;
}

export const DELETE_USER_BY_ID_USE_CASE_TOKEN = Symbol(
  'DELETE_USER_BY_ID_USE_CASE',
);

@Injectable()
export class DeleteUserByIdUseCase implements IDeleteUserByIdUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(GET_CUSTOMER_BY_ID_USE_CASE_TOKEN)
    private readonly getCustomerByIdUseCase: IGetCustomerByIdUseCase,
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
    private configService: ConfigService,
  ) {}

  async execute(id: string, type: UserType): Promise<void> {
    const usersTableName = this.configService.get<string>(TableName.USERS);

    this.logger.info('Checking if user exists in the database');

    const customer = await this.getCustomerByIdUseCase.execute(id);

    if (!customer) {
      this.logger.warn('User not found in the database', { id, type });
      return;
    }

    this.logger.info('Deleting user by ID from the database', { id });

    const command = new DeleteCommand({
      TableName: usersTableName,
      Key: {
        id,
        type,
      },
      ConditionExpression: '#type = :type',
      ExpressionAttributeNames: {
        '#type': 'type',
      },
      ExpressionAttributeValues: {
        ':type': type,
      },
    });

    await this.database.deleteItem(command);

    this.logger.info('User has been deleted successfully');
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ILoggerClient, LOGGER_CLIENT_TOKEN } from '../client/logger.client';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '../client/dynamodb.client';
import { ConfigService } from '@nestjs/config';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { UserType } from '../dto/user-type.dto';

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
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
    private configService: ConfigService,
  ) {}

  async execute(id: string, type: UserType): Promise<void> {
    const usersTableName = this.configService.get<string>('USERS_TABLE_NAME');

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

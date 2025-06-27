import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { UserDto } from '../dto/user.dto';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';

export interface IGetAllCustomersUseCase {
  execute(): Promise<UserDto[]>;
}

export const GET_ALL_CUSTOMERS_USE_CASE_TOKEN = Symbol(
  'GET_ALL_CUSTOMERS_USE_CASE',
);

@Injectable()
export class GetAllCustomersUseCase implements IGetAllCustomersUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
    private configService: ConfigService,
  ) {}

  async execute(): Promise<UserDto[]> {
    const usersTableName = this.configService.get<string>('USERS_TABLE_NAME');

    this.logger.info('Requesting all customers to dynamodb');

    const command: ScanCommand = new ScanCommand({
      TableName: usersTableName,
      FilterExpression: '#type = :type',
      ExpressionAttributeNames: {
        '#type': 'type',
      },
      ExpressionAttributeValues: {
        ':type': 'CUSTOMER',
      },
    });

    const scanOutput = await this.database.scanItems(command);

    return scanOutput.Items as UserDto[];
  }
}

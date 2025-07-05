import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { TableName } from '@app/shared/src/constant/table-name.constant';
import { ConfigService } from '@nestjs/config';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';
import { CreateUserInputDto } from '@app/user/src/dto/create-user-input.dto';
import { UserDto } from '@app/user/src/dto/user.dto';
import { UserType } from '@app/user/src/dto/user-type.dto';
import { Inject, Injectable } from '@nestjs/common';

export const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  create(user: UserDto): Promise<void>;
  getAllByType(type: UserType): Promise<UserDto[]>;
  getByIdAndType(id: string, type: UserType): Promise<UserDto | null>;
  update(id: string, user: Partial<UserDto>): Promise<void>;
  delete(id: string, type: UserType): Promise<void>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly tableName: string;

  constructor(
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
    private readonly configService: ConfigService,
  ) {
    this.tableName = this.configService.get<string>(TableName.USERS);
  }

  async create(user: CreateUserInputDto): Promise<void> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: user,
    });

    await this.database.putItem(command);
  }

  async getAllByType(type: UserType): Promise<UserDto[]> {
    const command: ScanCommand = new ScanCommand({
      TableName: this.tableName,
      FilterExpression: '#type = :type',
      ExpressionAttributeNames: {
        '#type': 'type',
      },
      ExpressionAttributeValues: {
        ':type': type,
      },
    });

    const result = await this.database.scanItems(command);
    return (result.Items as UserDto[]) || [];
  }

  async getByIdAndType(id: string, type: UserType): Promise<UserDto | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        id,
        type,
      },
    });

    const result = await this.database.getItem(command);
    return (result.Item as UserDto) || null;
  }

  async update(id: string, user: any): Promise<void> {
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'set #name = :name',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: { ':name': user.name },
    });
    await this.database.updateItem(command);
  }

  async delete(id: string, type: UserType): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
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
  }
}

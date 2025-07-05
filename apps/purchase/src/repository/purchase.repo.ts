import { PurchaseDto } from '@app/purchase/src/dto/purchase.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';
import { ConfigService } from '@nestjs/config';
import { TableName } from '@app/shared/src/constant/table-name.constant';
import {
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

export const PURCHASE_REPOSITORY_TOKEN = Symbol('PURCHASE_REPOSITORY');

export interface IPurchaseRepository {
  create(purchase: PurchaseDto): Promise<void>;
  findById(id: string): Promise<PurchaseDto | null>;
  getAll(): Promise<PurchaseDto[]>;
  update(id: string, purchase: Partial<PurchaseDto>): Promise<void>;
}

@Injectable()
export class PurchaseRepository implements IPurchaseRepository {
  private readonly tableName: string;

  constructor(
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
    private readonly configService: ConfigService,
  ) {
    this.tableName = this.configService.get<string>(TableName.PURCHASES);
  }

  async create(purchase: PurchaseDto): Promise<void> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: purchase,
    });

    await this.database.putItem(command);
  }

  async findById(id: string): Promise<PurchaseDto | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        id,
      },
    });

    const result = await this.database.getItem(command);

    return (result.Item as PurchaseDto) || null;
  }

  async getAll(): Promise<PurchaseDto[]> {
    const command: ScanCommand = new ScanCommand({
      TableName: this.tableName,
    });

    const result = await this.database.scanItems(command);

    return (result.Items as PurchaseDto[]) || null;
  }

  async update(id: string, purchase: Partial<PurchaseDto>): Promise<void> {
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: {
        id,
      },
      UpdateExpression: 'SET #status = :status, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':status': purchase.status,
        ':updatedAt': new Date().toISOString(),
      },
      ConditionExpression: 'attribute_exists(id)',
    });

    await this.database.updateItem(command);
  }
}

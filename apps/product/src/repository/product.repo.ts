import { ProductDto } from '@app/product/src/dto/product.dto';
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';
import { ConfigService } from '@nestjs/config';
import { TableName } from '@app/shared/src/constant/table-name.constant';

export const PRODUCT_REPOSITORY_TOKEN = Symbol('PRODUCT_REPOSITORY');

export interface IProductRepository {
  findById(id: string): Promise<ProductDto | null>;
  findAll(): Promise<ProductDto[]>;
  create(product: ProductDto): Promise<void>;
  update(id: string, product: Partial<ProductDto>): Promise<void>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class ProductRepository implements IProductRepository {
  private readonly tableName: string;

  constructor(
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
    private readonly configService: ConfigService,
  ) {
    this.tableName = this.configService.get<string>(TableName.PRODUCTS);
  }

  async findById(id: string): Promise<ProductDto | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });

    const result = await this.database.getItem(command);

    return (result.Item as ProductDto) ?? null;
  }

  async findAll(): Promise<ProductDto[]> {
    const command: ScanCommand = new ScanCommand({
      TableName: this.tableName,
    });

    const result = await this.database.scanItems(command);

    return result.Items as ProductDto[];
  }

  async create(product: ProductDto): Promise<void> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: product,
    });

    await this.database.putItem(command);
  }

  async update(id: string, product: Partial<ProductDto>): Promise<void> {
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: {
        id,
      },
      UpdateExpression:
        'SET #name = :name, #description = :description, #price = :price, #category = :category, #stock = :stock, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#description': 'description',
        '#price': 'price',
        '#category': 'category',
        '#stock': 'stock',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        '#name': product.name,
        '#description': product.description,
        '#price': product.price,
        '#category': product.category,
        '#stock': product.stock,
        ':updatedAt': new Date().toISOString(),
      },
    });

    await this.database.updateItem(command);
  }

  async delete(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id },
    });

    await this.database.deleteItem(command);
  }
}

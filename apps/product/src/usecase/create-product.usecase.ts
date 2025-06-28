import { Inject, Injectable } from '@nestjs/common';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { buildProductMapper } from '@app/product/src/mapper/build-product.mapper';
import { CreateProductInputDto } from '@app/product/src/dto/create-product-input.dto';
import { TableName } from '@app/shared/src/constant/table-name.constant';

export interface ICreateProductUseCase {
  execute(data: CreateProductInputDto): Promise<void>;
}

export const CREATE_PRODUCT_USE_CASE_TOKEN = Symbol('CREATE_PRODUCT_USE_CASE');

@Injectable()
export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
  ) {}

  async execute(data: CreateProductInputDto): Promise<void> {
    const productTableName = this.configService.get<string>(TableName.PRODUCTS);

    this.logger.info('Creating product');
    this.logger.debug('Product information:', { product: data });

    const product = buildProductMapper(data);

    const command = new PutCommand({
      TableName: productTableName,
      Item: product,
    });

    await this.database.putItem(command);

    this.logger.info('Product has been created successfully');
  }
}

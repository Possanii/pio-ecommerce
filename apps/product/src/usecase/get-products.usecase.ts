import { ProductDto } from '@app/product/src/dto/product.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import { ConfigService } from '@nestjs/config';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { TableName } from '@app/shared/src/constant/table-name.constant';

export const GET_PRODUCTS_USE_CASE_TOKEN = Symbol('GET_PRODUCTS_USE_CASE');

export interface IGetProductsUseCase {
  execute(): Promise<ProductDto[]>;
}

@Injectable()
export class GetProductsUseCase implements IGetProductsUseCase {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
  ) {}

  async execute(): Promise<ProductDto[]> {
    const productTableName = this.configService.get<string>(TableName.PRODUCTS);

    this.logger.info('Requesting all products to dynamodb');

    const command: ScanCommand = new ScanCommand({
      TableName: productTableName,
    });

    const scanOutput = await this.database.scanItems(command);

    return scanOutput.Items as ProductDto[];
  }
}

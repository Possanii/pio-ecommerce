import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import {
  GET_PRODUCT_BY_ID_USE_CASE_TOKEN,
  IGetProductByIdUseCase,
} from '@app/product/src/usecase/get-product-by-id.usecase';
import { TableName } from '@app/shared/src/constant/table-name.constant';

export const DELETE_PRODUCT_BY_ID_USE_CASE_TOKEN = Symbol(
  'DELETE_PRODUCT_BY_ID_USE_CASE',
);

export interface IDeleteProductByIdUseCase {
  execute(id: string): Promise<void>;
}

@Injectable()
export class DeleteProductByIdUseCase implements IDeleteProductByIdUseCase {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(GET_PRODUCT_BY_ID_USE_CASE_TOKEN)
    private readonly getProductByIdUseCase: IGetProductByIdUseCase,
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
  ) {}

  async execute(id: string): Promise<void> {
    const productTableName = this.configService.get<string>(TableName.PRODUCTS);

    this.logger.info('Checking if product exists in the database');

    const product = await this.getProductByIdUseCase.execute(id);

    if (!product) {
      this.logger.warn('Product not found in the database', { id });
      return;
    }

    this.logger.info(`Deleting product with id ${id} from dynamodb`);

    const command = new DeleteCommand({
      TableName: productTableName,
      Key: { id },
    });

    await this.database.deleteItem(command);

    this.logger.info('Product has been deleted successfully');
  }
}

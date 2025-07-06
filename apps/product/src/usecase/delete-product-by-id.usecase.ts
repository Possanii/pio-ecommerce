import { Inject, Injectable } from '@nestjs/common';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  GET_PRODUCT_BY_ID_USE_CASE_TOKEN,
  IGetProductByIdUseCase,
} from '@app/product/src/usecase/get-product-by-id.usecase';
import {
  IProductRepository,
  PRODUCT_REPOSITORY_TOKEN,
} from '@app/product/src/repository/product.repo';

export const DELETE_PRODUCT_BY_ID_USE_CASE_TOKEN = Symbol(
  'DELETE_PRODUCT_BY_ID_USE_CASE',
);

export interface IDeleteProductByIdUseCase {
  execute(id: string): Promise<void>;
}

@Injectable()
export class DeleteProductByIdUseCase implements IDeleteProductByIdUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(GET_PRODUCT_BY_ID_USE_CASE_TOKEN)
    private readonly getProductByIdUseCase: IGetProductByIdUseCase,
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepo: IProductRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.info('Checking if product exists in the database');

    const product = await this.getProductByIdUseCase.execute(id);

    if (!product) {
      this.logger.warn('Product not found in the database', { id });
      return;
    }

    this.logger.info(`Deleting product with id ${id} from dynamodb`);

    await this.productRepo.delete(id);

    this.logger.info('Product has been deleted successfully');
  }
}

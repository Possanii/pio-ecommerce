import { ProductDto } from '@app/product/src/dto/product.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  IProductRepository,
  PRODUCT_REPOSITORY_TOKEN,
} from '@app/product/src/repository/product.repo';

export const GET_PRODUCTS_USE_CASE_TOKEN = Symbol('GET_PRODUCTS_USE_CASE');

export interface IGetProductsUseCase {
  execute(): Promise<ProductDto[]>;
}

@Injectable()
export class GetProductsUseCase implements IGetProductsUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepo: IProductRepository,
  ) {}

  async execute(): Promise<ProductDto[]> {
    this.logger.info('Requesting all products to dynamodb');

    const products = await this.productRepo.findAll();

    this.logger.info('All products have been retrieved successfully', {
      total: products.length,
    });

    return products;
  }
}

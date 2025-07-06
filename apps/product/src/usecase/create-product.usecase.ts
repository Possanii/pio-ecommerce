import { Inject, Injectable } from '@nestjs/common';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import { buildProductMapper } from '@app/product/src/mapper/build-product.mapper';
import { CreateProductInputDto } from '@app/product/src/dto/create-product-input.dto';
import {
  IProductRepository,
  PRODUCT_REPOSITORY_TOKEN,
} from '@app/product/src/repository/product.repo';

export interface ICreateProductUseCase {
  execute(data: CreateProductInputDto): Promise<void>;
}

export const CREATE_PRODUCT_USE_CASE_TOKEN = Symbol('CREATE_PRODUCT_USE_CASE');

@Injectable()
export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepo: IProductRepository,
  ) {}

  async execute(data: CreateProductInputDto): Promise<void> {
    this.logger.info('Creating product');
    this.logger.debug('Product information:', { product: data });

    const product = buildProductMapper(data);

    await this.productRepo.create(product);

    this.logger.info('Product has been created successfully');
  }
}

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

export const GET_PRODUCT_BY_ID_USE_CASE_TOKEN = Symbol(
  'GET_PRODUCT_BY_ID_USE_CASE',
);

export interface IGetProductByIdUseCase {
  execute(id: string): Promise<ProductDto | null>;
}

@Injectable()
export class GetProductByIdUseCase implements IGetProductByIdUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepo: IProductRepository,
  ) {}

  async execute(id: string): Promise<ProductDto | null> {
    this.logger.info(`Requesting product with id ${id} from dynamodb`);

    const product = await this.productRepo.findById(id);

    if (!product) {
      this.logger.warn(`Product with id ${id} not found`);
    }

    return product;
  }
}

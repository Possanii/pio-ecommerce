import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { SharedModule } from '@app/shared/src/shared.module';
import {
  CREATE_PRODUCT_USE_CASE_TOKEN,
  CreateProductUseCase,
} from '@app/product/src/usecase/create-product.usecase';
import {
  GET_PRODUCTS_USE_CASE_TOKEN,
  GetProductsUseCase,
} from '@app/product/src/usecase/get-products.usecase';
import {
  GET_PRODUCT_BY_ID_USE_CASE_TOKEN,
  GetProductByIdUseCase,
} from '@app/product/src/usecase/get-product-by-id.usecase';
import {
  DELETE_PRODUCT_BY_ID_USE_CASE_TOKEN,
  DeleteProductByIdUseCase,
} from '@app/product/src/usecase/delete-product-by-id.usecase';
import {
  PRODUCT_REPOSITORY_TOKEN,
  ProductRepository,
} from '@app/product/src/repository/product.repo';

@Module({
  imports: [SharedModule],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_REPOSITORY_TOKEN,
      useClass: ProductRepository,
    },
    {
      provide: CREATE_PRODUCT_USE_CASE_TOKEN,
      useClass: CreateProductUseCase,
    },
    {
      provide: GET_PRODUCTS_USE_CASE_TOKEN,
      useClass: GetProductsUseCase,
    },
    {
      provide: GET_PRODUCT_BY_ID_USE_CASE_TOKEN,
      useClass: GetProductByIdUseCase,
    },
    {
      provide: DELETE_PRODUCT_BY_ID_USE_CASE_TOKEN,
      useClass: DeleteProductByIdUseCase,
    },
  ],
})
export class ProductModule {}

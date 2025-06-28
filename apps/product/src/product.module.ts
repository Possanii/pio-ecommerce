import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { SharedModule } from '@app/shared/src/shared.module';
import {
  CREATE_PRODUCT_USE_CASE_TOKEN,
  CreateProductUseCase,
} from '@app/product/src/usecase/create-product.usecase';

@Module({
  imports: [SharedModule],
  controllers: [ProductController],
  providers: [
    {
      provide: CREATE_PRODUCT_USE_CASE_TOKEN,
      useClass: CreateProductUseCase,
    },
  ],
})
export class ProductModule {}

import {Module} from '@nestjs/common';
import {ProductController} from './controller/product.controller';
import {ProductUseCase} from './usecase/product.usecase';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductUseCase],
})
export class ProductModule {}

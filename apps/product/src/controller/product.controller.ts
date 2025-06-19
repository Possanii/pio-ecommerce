import {Controller, Get} from '@nestjs/common';
import {ProductUseCase} from '../usecase/product.usecase';

@Controller()
export class ProductController {
  constructor(private readonly productsUseCase: ProductUseCase) {}

  @Get()
  getHello(): string {
    return this.productsUseCase.getHello();
  }
}

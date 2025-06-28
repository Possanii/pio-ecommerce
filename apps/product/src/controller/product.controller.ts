import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CREATE_PRODUCT_USE_CASE_TOKEN,
  ICreateProductUseCase,
} from '../usecase/create-product.usecase';
import { CreateProductInputDto } from '@app/product/src/dto/create-product-input.dto';

@Controller(`/products`)
export class ProductController {
  constructor(
    @Inject(CREATE_PRODUCT_USE_CASE_TOKEN)
    private readonly createProductUseCase: ICreateProductUseCase,
  ) {}

  @Post()
  async createProduct(@Body() body: CreateProductInputDto) {
    await this.createProductUseCase.execute(body);

    return {
      status: 201,
    };
  }
}

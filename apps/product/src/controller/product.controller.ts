import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  CREATE_PRODUCT_USE_CASE_TOKEN,
  ICreateProductUseCase,
} from '../usecase/create-product.usecase';
import { CreateProductInputDto } from '@app/product/src/dto/create-product-input.dto';
import {
  GET_PRODUCTS_USE_CASE_TOKEN,
  IGetProductsUseCase,
} from '@app/product/src/usecase/get-products.usecase';

@Controller(`/products`)
export class ProductController {
  constructor(
    @Inject(CREATE_PRODUCT_USE_CASE_TOKEN)
    private readonly createProductUseCase: ICreateProductUseCase,
    @Inject(GET_PRODUCTS_USE_CASE_TOKEN)
    private readonly getProductsUseCase: IGetProductsUseCase,
  ) {}

  @Post()
  async createProduct(@Body() body: CreateProductInputDto) {
    await this.createProductUseCase.execute(body);

    return {
      status: 201,
    };
  }

  @Get()
  async getAllProducts() {
    return this.getProductsUseCase.execute();
  }
}

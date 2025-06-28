import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  CREATE_PRODUCT_USE_CASE_TOKEN,
  ICreateProductUseCase,
} from '../usecase/create-product.usecase';
import { CreateProductInputDto } from '@app/product/src/dto/create-product-input.dto';
import {
  GET_PRODUCTS_USE_CASE_TOKEN,
  IGetProductsUseCase,
} from '@app/product/src/usecase/get-products.usecase';
import { IdDto } from '@app/shared/src/dto/id.dto';
import {
  GET_PRODUCT_BY_ID_USE_CASE_TOKEN,
  IGetProductByIdUseCase,
} from '@app/product/src/usecase/get-product-by-id.usecase';

@Controller(`/products`)
export class ProductController {
  constructor(
    @Inject(CREATE_PRODUCT_USE_CASE_TOKEN)
    private readonly createProductUseCase: ICreateProductUseCase,
    @Inject(GET_PRODUCTS_USE_CASE_TOKEN)
    private readonly getProductsUseCase: IGetProductsUseCase,
    @Inject(GET_PRODUCT_BY_ID_USE_CASE_TOKEN)
    private readonly getProductByIdUseCase: IGetProductByIdUseCase,
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

  @Get('/:id')
  async getProductById(@Param() param: IdDto) {
    return this.getProductByIdUseCase.execute(param.id);
  }
}

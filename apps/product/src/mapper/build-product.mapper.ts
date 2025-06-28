import { CreateProductInputDto } from '@app/product/src/dto/create-product-input.dto';
import { ProductDto } from '@app/product/src/dto/product.dto';
import { randomUUID } from 'node:crypto';

export function buildProductMapper(product: CreateProductInputDto): ProductDto {
  return {
    id: randomUUID(),
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
    createdAt: new Date(),
  };
}

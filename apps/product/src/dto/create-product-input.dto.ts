import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ProductType } from '@app/product/src/dto/product.dto';

export class CreateProductInputDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  price: number;

  @IsEnum(ProductType)
  category: ProductType;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsPositive()
  stock: number;
}

export enum ProductType {
  ELECTRONICS = 'ELECTRONICS',
  CLOTHING = 'CLOTHING',
  FOOD = 'FOOD',
  FURNITURE = 'FURNITURE',
  TOYS = 'TOYS',
  BOOKS = 'BOOKS',
  BEAUTY = 'BEAUTY',
  SPORTS = 'SPORTS',
  AUTOMOTIVE = 'AUTOMOTIVE',
  HEALTH = 'HEALTH',
}

export class ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductType;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

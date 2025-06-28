import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreatePurchaseInputDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsUUID()
  customerId: string;

  @IsUUID()
  transactionId: string;
}

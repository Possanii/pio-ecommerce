import { PurchaseStatus } from '@app/purchase/src/dto/purchase-status.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdatePurchaseDto {
  @IsEnum(PurchaseStatus)
  @IsOptional()
  status?: PurchaseStatus;
}

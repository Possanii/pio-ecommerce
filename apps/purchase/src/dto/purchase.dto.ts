import { PurchaseStatus } from '@app/purchase/src/dto/purchase-status.dto';

export class PurchaseDto {
  id: string;
  customerId: string;
  productId: string;
  transactionId: string;
  quantity: number;
  status: PurchaseStatus;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

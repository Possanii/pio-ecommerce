import { randomUUID } from 'node:crypto';
import { CreatePurchaseInputDto } from '@app/purchase/src/dto/create-purchase-input.dto';
import { PurchaseStatus } from '@app/purchase/src/dto/purchase-status.dto';
import { PurchaseDto } from '@app/purchase/src/dto/purchase.dto';

export function buildPurchaseMapper(
  purchase: CreatePurchaseInputDto,
): PurchaseDto {
  return {
    id: randomUUID(),
    customerId: purchase.customerId,
    productId: purchase.productId,
    transactionId: purchase.transactionId,
    quantity: purchase.quantity,
    status: PurchaseStatus.REQUESTED,
    createdAt: new Date().toISOString(),
  };
}

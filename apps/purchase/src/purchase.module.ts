import { Module } from '@nestjs/common';
import { PurchaseController } from './controller/purchase.controller';
import { SharedModule } from '@app/shared/src/shared.module';
import {
  CREATE_PURCHASE_USE_CASE_TOKEN,
  CreatePurchaseUseCase,
} from '@app/purchase/src/usecase/create-purchase.usecase';
import {
  GET_PURCHASES_USE_CASE_TOKEN,
  GetPurchasesUseCase,
} from '@app/purchase/src/usecase/get-purchases.usecase';
import {
  GET_PURCHASE_BY_ID_USE_CASE_TOKEN,
  GetPurchaseByIdUseCase,
} from '@app/purchase/src/usecase/get-purchase-by-id.usecase';
import {
  UPDATE_PURCHASE_USE_CASE_TOKEN,
  UpdatePurchaseUseCase,
} from '@app/purchase/src/usecase/update-purchase.usecase';
import {
  PURCHASE_REPOSITORY_TOKEN,
  PurchaseRepository,
} from '@app/purchase/src/repository/purchase.repo';

@Module({
  imports: [SharedModule],
  controllers: [PurchaseController],
  providers: [
    {
      provide: PURCHASE_REPOSITORY_TOKEN,
      useClass: PurchaseRepository,
    },
    {
      provide: CREATE_PURCHASE_USE_CASE_TOKEN,
      useClass: CreatePurchaseUseCase,
    },
    {
      provide: GET_PURCHASES_USE_CASE_TOKEN,
      useClass: GetPurchasesUseCase,
    },
    {
      provide: GET_PURCHASE_BY_ID_USE_CASE_TOKEN,
      useClass: GetPurchaseByIdUseCase,
    },
    {
      provide: UPDATE_PURCHASE_USE_CASE_TOKEN,
      useClass: UpdatePurchaseUseCase,
    },
  ],
})
export class PurchaseModule {}

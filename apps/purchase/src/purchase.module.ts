import { Module } from '@nestjs/common';
import { PurchaseController } from './controller/purchase.controller';
import { SharedModule } from '@app/shared/src/shared.module';
import {
  CREATE_PURCHASE_USE_CASE_TOKEN,
  CreatePurchaseUseCase,
} from '@app/purchase/src/usecase/purchase.usecase';
import {
  GET_PURCHASES_USE_CASE_TOKEN,
  GetPurchasesUseCase,
} from '@app/purchase/src/usecase/get-purchases.usecase';
import {
  GET_PURCHASE_BY_ID_USE_CASE_TOKEN,
  GetPurchaseByIdUseCase,
} from '@app/purchase/src/usecase/get-pruchase-by-id.usecase';
import {
  UPDATE_PURCHASE_USE_CASE_TOKEN,
  UpdatePurchaseUseCase,
} from '@app/purchase/src/usecase/update-purchase.usecase';

@Module({
  imports: [SharedModule],
  controllers: [PurchaseController],
  providers: [
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

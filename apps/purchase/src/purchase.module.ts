import { Module } from '@nestjs/common';
import { PurchaseController } from './controller/purchase.controller';
import { SharedModule } from '@app/shared/src/shared.module';
import {
  CREATE_PURCHASE_USE_CASE_TOKEN,
  CreatePurchaseUseCase,
} from '@app/purchase/src/usecase/purchase.usecase';

@Module({
  imports: [SharedModule],
  controllers: [PurchaseController],
  providers: [
    {
      provide: CREATE_PURCHASE_USE_CASE_TOKEN,
      useClass: CreatePurchaseUseCase,
    },
  ],
})
export class PurchaseModule {}

import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';

@Module({
  imports: [],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}

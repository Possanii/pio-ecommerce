import {Module} from '@nestjs/common';
import {PurchaseController} from './controller/purchase.controller';
import {PurchaseUseCase} from './usecase/purchase.usecase';

@Module({
  imports: [],
  controllers: [PurchaseController],
  providers: [PurchaseUseCase],
})
export class PurchaseModule {}

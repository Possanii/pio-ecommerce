import {Controller, Get} from '@nestjs/common';
import {PurchaseUseCase} from '../usecase/purchase.usecase';

@Controller()
export class PurchaseController {
  constructor(private readonly purchaseUseCase: PurchaseUseCase) {}

  @Get()
  getHello(): string {
    return this.purchaseUseCase.getHello();
  }
}

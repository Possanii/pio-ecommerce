import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CREATE_PURCHASE_USE_CASE_TOKEN,
  ICreatePurchaseUseCase,
} from '../usecase/purchase.usecase';
import { CreatePurchaseInputDto } from '@app/purchase/src/dto/create-purchase-input.dto';

@Controller('/purchases')
export class PurchaseController {
  constructor(
    @Inject(CREATE_PURCHASE_USE_CASE_TOKEN)
    private readonly createPurchaseUseCase: ICreatePurchaseUseCase,
  ) {}

  @Post()
  async createPurchase(@Body() body: CreatePurchaseInputDto) {
    await this.createPurchaseUseCase.execute(body);

    return {
      status: 204,
    };
  }
}

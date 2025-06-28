import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  CREATE_PURCHASE_USE_CASE_TOKEN,
  ICreatePurchaseUseCase,
} from '../usecase/purchase.usecase';
import { CreatePurchaseInputDto } from '@app/purchase/src/dto/create-purchase-input.dto';
import {
  GET_PURCHASES_USE_CASE_TOKEN,
  IGetPurchasesUseCase,
} from '@app/purchase/src/usecase/get-purchases.usecase';

@Controller('/purchases')
export class PurchaseController {
  constructor(
    @Inject(CREATE_PURCHASE_USE_CASE_TOKEN)
    private readonly createPurchaseUseCase: ICreatePurchaseUseCase,
    @Inject(GET_PURCHASES_USE_CASE_TOKEN)
    private readonly getPurchasesUseCase: IGetPurchasesUseCase,
  ) {}

  @Post()
  async createPurchase(@Body() body: CreatePurchaseInputDto) {
    await this.createPurchaseUseCase.execute(body);

    return {
      status: 204,
    };
  }

  @Get()
  async getPurchases() {
    return this.getPurchasesUseCase.execute();
  }
}

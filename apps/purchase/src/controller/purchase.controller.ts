import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CREATE_PURCHASE_USE_CASE_TOKEN,
  ICreatePurchaseUseCase,
} from '../usecase/crete-purchase.usecase';
import { CreatePurchaseInputDto } from '@app/purchase/src/dto/create-purchase-input.dto';
import {
  GET_PURCHASES_USE_CASE_TOKEN,
  IGetPurchasesUseCase,
} from '@app/purchase/src/usecase/get-purchases.usecase';
import { IdDto } from '@app/shared/src/dto/id.dto';
import {
  GET_PURCHASE_BY_ID_USE_CASE_TOKEN,
  IGetPurchaseByIdUseCase,
} from '@app/purchase/src/usecase/get-purchase-by-id.usecase';
import {
  IUpdatePurchaseUseCase,
  UPDATE_PURCHASE_USE_CASE_TOKEN,
} from '@app/purchase/src/usecase/update-purchase.usecase';
import { UpdatePurchaseDto } from '@app/purchase/src/dto/update-purchase-input.dto';

@Controller('/purchases')
export class PurchaseController {
  constructor(
    @Inject(CREATE_PURCHASE_USE_CASE_TOKEN)
    private readonly createPurchaseUseCase: ICreatePurchaseUseCase,
    @Inject(GET_PURCHASES_USE_CASE_TOKEN)
    private readonly getPurchasesUseCase: IGetPurchasesUseCase,
    @Inject(GET_PURCHASE_BY_ID_USE_CASE_TOKEN)
    private readonly getPurchaseByIdUseCase: IGetPurchaseByIdUseCase,
    @Inject(UPDATE_PURCHASE_USE_CASE_TOKEN)
    private readonly updatePurchaseUseCase: IUpdatePurchaseUseCase,
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

  @Get('/:id')
  async getPurchaseById(@Param() param: IdDto) {
    return this.getPurchaseByIdUseCase.execute(param.id);
  }

  @Put('/:id')
  async updatePurchase(@Param() param: IdDto, @Body() body: UpdatePurchaseDto) {
    await this.updatePurchaseUseCase.execute(param.id, body);
  }
}

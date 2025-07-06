import { Inject, Injectable } from '@nestjs/common';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import { PurchaseDto } from '@app/purchase/src/dto/purchase.dto';
import { UpdatePurchaseDto } from '@app/purchase/src/dto/update-purchase-input.dto';
import {
  IPurchaseRepository,
  PURCHASE_REPOSITORY_TOKEN,
} from '@app/purchase/src/repository/purchase.repo';
import {
  GET_PURCHASE_BY_ID_USE_CASE_TOKEN,
  IGetPurchaseByIdUseCase,
} from '@app/purchase/src/usecase/get-purchase-by-id.usecase';

export const UPDATE_PURCHASE_USE_CASE_TOKEN = Symbol(
  'UPDATE_PURCHASE_USE_CASE',
);

export interface IUpdatePurchaseUseCase {
  execute(id: string, status: Partial<PurchaseDto>): Promise<void>;
}

@Injectable()
export class UpdatePurchaseUseCase implements IUpdatePurchaseUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(GET_PURCHASE_BY_ID_USE_CASE_TOKEN)
    private readonly getPurchaseByIdUseCase: IGetPurchaseByIdUseCase,
    @Inject(PURCHASE_REPOSITORY_TOKEN)
    private readonly purchaseRepo: IPurchaseRepository,
  ) {}

  async execute(id: string, purchase: UpdatePurchaseDto): Promise<void> {
    this.logger.info('Updating purchase by Id', { id });

    const purchaseExists = await this.getPurchaseByIdUseCase.execute(id);

    if (!purchaseExists) {
      this.logger.warn('Purchase not found in the database', { id });
      return;
    }

    await this.purchaseRepo.update(id, purchase);

    this.logger.info('Purchase has been updated successfully');
  }
}

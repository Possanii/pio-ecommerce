import { Inject, Injectable } from '@nestjs/common';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import { PurchaseDto } from '@app/purchase/src/dto/purchase.dto';
import {
  IPurchaseRepository,
  PURCHASE_REPOSITORY_TOKEN,
} from '@app/purchase/src/repository/purchase.repo';

export const GET_PURCHASE_BY_ID_USE_CASE_TOKEN = Symbol(
  'GET_PURCHASE_BY_ID_USE_CASE',
);

export interface IGetPurchaseByIdUseCase {
  execute(id: string): Promise<PurchaseDto | null>;
}

@Injectable()
export class GetPurchaseByIdUseCase implements IGetPurchaseByIdUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(PURCHASE_REPOSITORY_TOKEN)
    private readonly purchaseRepo: IPurchaseRepository,
  ) {}

  async execute(id: string): Promise<PurchaseDto | null> {
    this.logger.info('Getting purchase by ID from the database', { id });

    const purchase = await this.purchaseRepo.findById(id);

    if (!purchase) {
      this.logger.warn('Purchase not found', { id });
    }

    return purchase;
  }
}

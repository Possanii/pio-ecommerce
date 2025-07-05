import { PurchaseDto } from '@app/purchase/src/dto/purchase.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  IPurchaseRepository,
  PURCHASE_REPOSITORY_TOKEN,
} from '@app/purchase/src/repository/purchase.repo';

export const GET_PURCHASES_USE_CASE_TOKEN = Symbol('GET_PURCHASES_USE_CASE');

export interface IGetPurchasesUseCase {
  execute(): Promise<PurchaseDto[]>;
}

@Injectable()
export class GetPurchasesUseCase implements IGetPurchasesUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(PURCHASE_REPOSITORY_TOKEN)
    private readonly purchaseRepo: IPurchaseRepository,
  ) {}

  async execute(): Promise<PurchaseDto[]> {
    this.logger.info('Requesting all purchases to dynamodb');

    const purchases = await this.purchaseRepo.getAll();

    this.logger.info('All purchases have been retrieved successfully', {
      total: purchases.length,
    });

    return purchases;
  }
}

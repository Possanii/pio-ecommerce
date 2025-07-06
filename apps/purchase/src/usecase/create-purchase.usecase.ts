import { Inject, Injectable } from '@nestjs/common';
import { CreatePurchaseInputDto } from '@app/purchase/src/dto/create-purchase-input.dto';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import { buildPurchaseMapper } from '@app/purchase/src/mapper/build-purchase.mapper';
import {
  IPurchaseRepository,
  PURCHASE_REPOSITORY_TOKEN,
} from '@app/purchase/src/repository/purchase.repo';

export const CREATE_PURCHASE_USE_CASE_TOKEN = Symbol(
  'CREATE_PURCHASE_USE_CASE',
);

export interface ICreatePurchaseUseCase {
  execute(purchase: CreatePurchaseInputDto): Promise<void>;
}

@Injectable()
export class CreatePurchaseUseCase implements ICreatePurchaseUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(PURCHASE_REPOSITORY_TOKEN)
    private readonly purchaseRepo: IPurchaseRepository,
  ) {}

  async execute(data: CreatePurchaseInputDto): Promise<void> {
    this.logger.info('Creating purchase');

    const purchase = buildPurchaseMapper(data);

    this.logger.debug('Purchase information:', { purchase });

    await this.purchaseRepo.create(purchase);

    this.logger.info('Purchase has been created successfully');
  }
}

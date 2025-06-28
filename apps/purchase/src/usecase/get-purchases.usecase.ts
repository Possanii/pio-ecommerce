import { PurchaseDto } from '@app/purchase/src/dto/purchase.dto';
import { Inject } from '@nestjs/common';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';
import { ConfigService } from '@nestjs/config';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

export const GET_PURCHASES_USE_CASE_TOKEN = Symbol('GET_PURCHASES_USE_CASE');

export interface IGetPurchasesUseCase {
  execute(): Promise<PurchaseDto[]>;
}

export class GetPurchasesUseCase implements IGetPurchasesUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
    private configService: ConfigService,
  ) {}

  async execute(): Promise<PurchaseDto[]> {
    const purchaseTableName = this.configService.get<string>(
      'PURCHASES_TABLE_NAME',
    );

    this.logger.info('Requesting all purchases to dynamodb');

    const command: ScanCommand = new ScanCommand({
      TableName: purchaseTableName,
    });

    const scanOutput = await this.database.scanItems(command);

    return scanOutput.Items as PurchaseDto[];
  }
}

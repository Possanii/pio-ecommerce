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
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { PurchaseDto } from '@app/purchase/src/dto/purchase.dto';

export const GET_PURCHASE_BY_ID_USE_CASE_TOKEN = Symbol(
  'GET_PURCHASE_BY_ID_USE_CASE',
);

export interface IGetPurchaseByIdUseCase {
  execute(id: string): Promise<PurchaseDto | null>;
}

export class GetPurchaseByIdUseCase implements IGetPurchaseByIdUseCase {
  constructor(
    private configService: ConfigService,
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
  ) {}

  async execute(id: string): Promise<PurchaseDto | null> {
    const purchasesTableName = this.configService.get<string>(
      'PURCHASES_TABLE_NAME',
    );

    this.logger.info('Getting purchase by ID from the database', { id });

    const command = new GetCommand({
      TableName: purchasesTableName,
      Key: {
        id,
      },
    });

    const purchase = await this.database.getItem(command);
    return purchase.Item as PurchaseDto | null;
  }
}

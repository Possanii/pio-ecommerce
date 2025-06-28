import { Inject, Injectable } from '@nestjs/common';
import { CreatePurchaseInputDto } from '@app/purchase/src/dto/create-purchase-input.dto';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';
import { ConfigService } from '@nestjs/config';
import { buildPurchaseMapper } from '@app/purchase/src/mapper/build-purchase.mapper';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { TableName } from '@app/shared/src/constant/table-name.constant';

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
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
    private configService: ConfigService,
  ) {}
  async execute(data: CreatePurchaseInputDto): Promise<void> {
    const purchasesTableName = this.configService.get<string>(
      TableName.PURCHASES,
    );

    this.logger.info('Creating purchase');

    const purchase = buildPurchaseMapper(data);

    this.logger.debug('Purchase information:', { purchase });

    const command = new PutCommand({
      TableName: purchasesTableName,
      Item: purchase,
    });

    await this.database.putItem(command);

    this.logger.info('Purchase has been created successfully');
  }
}

import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { PurchaseDto } from '@app/purchase/src/dto/purchase.dto';
import { UpdatePurchaseDto } from '@app/purchase/src/dto/update-purchase-input.dto';

export const UPDATE_PURCHASE_USE_CASE_TOKEN = Symbol(
  'UPDATE_PURCHASE_USE_CASE',
);

export interface IUpdatePurchaseUseCase {
  execute(id: string, status: Partial<PurchaseDto>): Promise<void>;
}

@Injectable()
export class UpdatePurchaseUseCase implements IUpdatePurchaseUseCase {
  constructor(
    private configService: ConfigService,
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(DYNAMODB_CLIENT_TOKEN)
    private readonly database: IDatabaseClient,
  ) {}

  async execute(id: string, purchase: UpdatePurchaseDto): Promise<void> {
    const purchasesTableName = this.configService.get<string>(
      'PURCHASES_TABLE_NAME',
    );

    this.logger.info('Updating purchase by Id', { id });

    const command = new UpdateCommand({
      TableName: purchasesTableName,
      Key: {
        id,
      },
      UpdateExpression: 'SET #status = :status, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':status': purchase.status,
        ':updatedAt': new Date().toISOString(),
      },
      ConditionExpression: 'attribute_exists(id)',
    });

    await this.database.updateItem(command);

    this.logger.info('Purchase has been updated successfully');
  }
}

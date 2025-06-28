import { ProductDto } from '@app/product/src/dto/product.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  DYNAMODB_CLIENT_TOKEN,
  IDatabaseClient,
} from '@app/shared/src/client/dynamodb.client';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

export const GET_PRODUCT_BY_ID_USE_CASE_TOKEN = Symbol(
  'GET_PRODUCT_BY_ID_USE_CASE',
);

export interface IGetProductByIdUseCase {
  execute(id: string): Promise<ProductDto | null>;
}

@Injectable()
export class GetProductByIdUseCase implements IGetProductByIdUseCase {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(DYNAMODB_CLIENT_TOKEN) private readonly database: IDatabaseClient,
  ) {}

  async execute(id: string): Promise<ProductDto | null> {
    const productTableName =
      this.configService.get<string>('PRODUCT_TABLE_NAME');

    this.logger.info(`Requesting product with id ${id} from dynamodb`);

    const command = new GetCommand({
      TableName: productTableName,
      Key: { id },
    });

    const getOutput = await this.database.getItem(command);

    return getOutput.Item as ProductDto;
  }
}

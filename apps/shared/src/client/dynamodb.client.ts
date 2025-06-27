import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  PutCommand,
  ScanCommand,
  ScanCommandOutput,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ILoggerClient, LOGGER_CLIENT_TOKEN } from './logger.client';

export interface IDatabaseClient {
  getItem(command: GetCommand): Promise<GetCommandOutput>;
  scanItems(command: ScanCommand): Promise<ScanCommandOutput>;
  putItem(command: PutCommand): Promise<void>;
  updateItem(command: UpdateCommand): Promise<void>;
  deleteItem(command: DeleteCommand): Promise<void>;
}

export const DYNAMODB_CLIENT_TOKEN = Symbol('DYNAMODB_CLIENT');

@Injectable()
export class DynamoClient implements IDatabaseClient {
  private readonly instance: DynamoDBDocumentClient;

  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
  ) {
    if (!this.instance) {
      const client = new DynamoDBClient({
        endpoint: process.env.DB_ENDPOINT,
      });

      this.instance = DynamoDBDocumentClient.from(client, {
        marshallOptions: {
          convertClassInstanceToMap: true,
        },
      });
    }

    this.logger.log('DynamoDB client initialized');
  }

  public async getItem(command: GetCommand): Promise<GetCommandOutput> {
    try {
      this.logger.info('Getting item from DynamoDB');
      return await this.instance.send(command);
    } catch (error) {
      this.logger.error('Error getting item from DynamoDB', error);
      throw new InternalServerErrorException(error);
    }
  }

  public async scanItems(command: ScanCommand): Promise<ScanCommandOutput> {
    try {
      this.logger.info('Retrieving all items from DynamoDB');
      return await this.instance.send(command);
    } catch (error) {
      this.logger.error('Error retrieving all items from DynamoDB', error);
      throw new InternalServerErrorException(error);
    }
  }

  public async putItem(command: PutCommand): Promise<void> {
    try {
      this.logger.info('Putting item into DynamoDB');
      await this.instance.send(command);
    } catch (error) {
      this.logger.error('Error putting item into DynamoDB', error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateItem(command: UpdateCommand): Promise<void> {
    try {
      this.logger.info('Updating item into DynamoDB');
      await this.instance.send(command);
    } catch (error) {
      this.logger.error('Error Updating item from DynamoDB', error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteItem(command: DeleteCommand): Promise<void> {
    try {
      this.logger.info('Deleting item from DynamoDB');
      await this.instance.send(command);
    } catch (error) {
      this.logger.error('Error deleting item from DynamoDB', error);
      throw new InternalServerErrorException(error);
    }
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LOGGER_CLIENT_TOKEN, LoggerClient } from './client/logger.client';
import { DynamoClient, DYNAMODB_CLIENT_TOKEN } from './client/dynamodb.client';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: LOGGER_CLIENT_TOKEN,
      useClass: LoggerClient,
    },
    {
      provide: DYNAMODB_CLIENT_TOKEN,
      useClass: DynamoClient,
    },
  ],
  exports: [LOGGER_CLIENT_TOKEN, DYNAMODB_CLIENT_TOKEN, ConfigModule],
})
export class SharedModule {}

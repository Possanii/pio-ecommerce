import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import {
  CREATE_CUSTOMER_USE_CASE_TOKEN,
  CreateCustomerUseCase,
} from './usecase/create-customer.usecase';
import { LOGGER_CLIENT_TOKEN, LoggerClient } from './client/logger.client';
import { DynamoClient, DYNAMODB_CLIENT_TOKEN } from './client/dynamodb.client';
import { ConfigModule } from '@nestjs/config';
import {
  GET_ALL_CUSTOMERS_USE_CASE_TOKEN,
  GetAllCustomersUseCase,
} from './usecase/get-all-customers.usecase';
import {
  GET_CUSTOMER_BY_ID_USE_CASE_TOKEN,
  GetCustomerByIdUseCase,
} from './usecase/get-customer-by-id.usecase';
import {
  DELETE_USER_BY_ID_USE_CASE_TOKEN,
  DeleteUserByIdUseCase,
} from './usecase/delete-customer-by-id.usecase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: LOGGER_CLIENT_TOKEN,
      useClass: LoggerClient,
    },
    {
      provide: DYNAMODB_CLIENT_TOKEN,
      useClass: DynamoClient,
    },
    {
      provide: CREATE_CUSTOMER_USE_CASE_TOKEN,
      useClass: CreateCustomerUseCase,
    },
    {
      provide: GET_ALL_CUSTOMERS_USE_CASE_TOKEN,
      useClass: GetAllCustomersUseCase,
    },
    {
      provide: GET_CUSTOMER_BY_ID_USE_CASE_TOKEN,
      useClass: GetCustomerByIdUseCase,
    },
    {
      provide: DELETE_USER_BY_ID_USE_CASE_TOKEN,
      useClass: DeleteUserByIdUseCase,
    },
  ],
})
export class UserModule {}

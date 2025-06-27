import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import {
  CREATE_CUSTOMER_USE_CASE_TOKEN,
  CreateCustomerUseCase,
} from './usecase/create-customer.usecase';
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
import { SharedModule } from '@app/shared/src/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [
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

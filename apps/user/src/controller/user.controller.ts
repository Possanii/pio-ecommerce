import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  CREATE_CUSTOMER_USE_CASE_TOKEN,
  ICreateCustomerUseCase,
} from '../usecase/create-customer.usecase';
import { CreateUserInputDto } from '../dto/create-user-input.dto';
import {
  GET_ALL_CUSTOMERS_USE_CASE_TOKEN,
  IGetAllCustomersUseCase,
} from '../usecase/get-all-customers.usecase';
import {
  GET_CUSTOMER_BY_ID_USE_CASE_TOKEN,
  IGetCustomerByIdUseCase,
} from '../usecase/get-customer-by-id.usecase';
import { IdDto } from '../dto/id.dto';

@Controller()
export class UserController {
  constructor(
    @Inject(CREATE_CUSTOMER_USE_CASE_TOKEN)
    private readonly createCustomerUseCase: ICreateCustomerUseCase,
    @Inject(GET_ALL_CUSTOMERS_USE_CASE_TOKEN)
    private readonly getAllCustomersUseCase: IGetAllCustomersUseCase,
    @Inject(GET_CUSTOMER_BY_ID_USE_CASE_TOKEN)
    private readonly getCustomerByIdUseCase: IGetCustomerByIdUseCase,
  ) {}

  @Post('/customer')
  async createCustomer(@Body() body: CreateUserInputDto) {
    await this.createCustomerUseCase.execute(body);

    return {
      status: 201,
    };
  }

  @Get('/customer')
  async getAllCustomers() {
    return this.getAllCustomersUseCase.execute();
  }

  @Get('/customer/:id')
  async getCustomerById(@Param() param: IdDto) {
    return this.getCustomerByIdUseCase.execute(param.id);
  }
}

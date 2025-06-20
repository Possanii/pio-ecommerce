import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CREATE_CUSTOMER_USE_CASE_TOKEN,
  ICreateCustomerUseCase,
} from '../usecase/create-customer.usecase';
import { CreateUserInputDto } from '../dto/create-user-input.dto';

@Controller()
export class UserController {
  constructor(
    @Inject(CREATE_CUSTOMER_USE_CASE_TOKEN)
    private readonly createCustomerUseCase: ICreateCustomerUseCase,
  ) {}

  @Post('/customer')
  async createCustomer(@Body() body: CreateUserInputDto) {
    await this.createCustomerUseCase.execute(body);

    return {
      status: 201,
    };
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInputDto } from '../dto/create-user-input.dto';
import { buildCustomerMapper } from '../mapper/build-customer.mapper';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@app/user/src/repository/user.repo';

export interface ICreateCustomerUseCase {
  execute(user: CreateUserInputDto): Promise<void>;
}

export const CREATE_CUSTOMER_USE_CASE_TOKEN = Symbol(
  'CREATE_CUSTOMER_USE_CASE',
);

@Injectable()
export class CreateCustomerUseCase implements ICreateCustomerUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepo: IUserRepository,
  ) {}

  async execute(user: CreateUserInputDto): Promise<void> {
    this.logger.info('Creating customer');
    this.logger.debug('Customer information:', { user });

    const customer = buildCustomerMapper(user);

    await this.userRepo.create(customer);

    this.logger.info('Customer has been created successfully');
  }
}

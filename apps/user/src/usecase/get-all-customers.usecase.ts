import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@app/user/src/repository/user.repo';
import { UserType } from '@app/user/src/dto/user-type.dto';

export interface IGetAllCustomersUseCase {
  execute(): Promise<UserDto[]>;
}

export const GET_ALL_CUSTOMERS_USE_CASE_TOKEN = Symbol(
  'GET_ALL_CUSTOMERS_USE_CASE',
);

@Injectable()
export class GetAllCustomersUsecase implements IGetAllCustomersUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepo: IUserRepository,
  ) {}

  async execute(): Promise<UserDto[]> {
    this.logger.info('Requesting all customers to dynamodb');

    const customers = await this.userRepo.getAllByType(UserType.CUSTOMER);

    this.logger.info('All customers have been retrieved successfully', {
      total: customers.length,
    });

    return customers;
  }
}

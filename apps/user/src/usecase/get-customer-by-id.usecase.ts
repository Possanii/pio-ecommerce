import { UserDto } from '../dto/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@app/user/src/repository/user.repo';
import { UserType } from '@app/user/src/dto/user-type.dto';

export interface IGetCustomerByIdUseCase {
  execute(id: string): Promise<UserDto>;
}

export const GET_CUSTOMER_BY_ID_USE_CASE_TOKEN = Symbol(
  'GET_CUSTOMER_BY_ID_USE_CASE',
);

@Injectable()
export class GetCustomerByIdUseCase implements IGetCustomerByIdUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: string): Promise<UserDto | null> {
    this.logger.info('Getting customer by ID from the database', { id });

    const customer = await this.userRepo.getByIdAndType(id, UserType.CUSTOMER);

    if (!customer) {
      this.logger.warn('Customer not found', { id });
    }

    return customer;
  }
}

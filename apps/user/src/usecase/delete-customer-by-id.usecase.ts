import { Inject, Injectable } from '@nestjs/common';
import { UserType } from '../dto/user-type.dto';
import {
  GET_CUSTOMER_BY_ID_USE_CASE_TOKEN,
  IGetCustomerByIdUseCase,
} from './get-customer-by-id.usecase';
import {
  ILoggerClient,
  LOGGER_CLIENT_TOKEN,
} from '@app/shared/src/client/logger.client';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@app/user/src/repository/user.repo';

export interface IDeleteUserByIdUseCase {
  execute(id: string, type: UserType): Promise<void>;
}

export const DELETE_USER_BY_ID_USE_CASE_TOKEN = Symbol(
  'DELETE_USER_BY_ID_USE_CASE',
);

@Injectable()
export class DeleteUserByIdUseCase implements IDeleteUserByIdUseCase {
  constructor(
    @Inject(LOGGER_CLIENT_TOKEN) private readonly logger: ILoggerClient,
    @Inject(GET_CUSTOMER_BY_ID_USE_CASE_TOKEN)
    private readonly getCustomerByIdUseCase: IGetCustomerByIdUseCase,
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: string, type: UserType): Promise<void> {
    this.logger.info('Checking if user exists in the database');

    const customer = await this.getCustomerByIdUseCase.execute(id);

    if (!customer) {
      this.logger.warn('User not found in the database', { id, type });
      return;
    }

    this.logger.info('Deleting user by ID from the database', { id });

    await this.userRepo.delete(id, type);

    this.logger.info('User has been deleted successfully');
  }
}

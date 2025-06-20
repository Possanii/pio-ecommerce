import { CreateUserInputDto } from '../dto/create-user-input.dto';
import { UserDto } from '../dto/user.dto';
import { randomUUID } from 'node:crypto';
import { UserType } from '../dto/user-type.dto';

export function buildCustomerMapper(user: CreateUserInputDto): UserDto {
  return {
    id: randomUUID(),
    type: UserType.CUSTOMER,
    name: user.name,
    email: user.email,
    createdAt: new Date(),
  };
}

import { CreateUserInputDto } from '../dto/create-user-input.dto';
import { UserDto } from '../dto/user.dto';
import { randomUUID } from 'node:crypto';

export function buildCustomerMapper(user: CreateUserInputDto): UserDto {
  return {
    id: randomUUID(),
    type: 'CUSTOMER',
    name: user.name,
    email: user.email,
  };
}

import { UserType } from './user-type.dto';

export class UserDto {
  id: string;
  type: UserType;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

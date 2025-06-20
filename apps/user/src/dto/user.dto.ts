export class UserDto {
  id: string;
  type: 'CUSTOMER' | 'SELLER';
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

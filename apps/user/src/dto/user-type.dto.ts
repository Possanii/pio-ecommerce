import { IsEnum } from 'class-validator';

export enum UserType {
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER',
}

export class UserTypeDto {
  @IsEnum(UserType)
  type: UserType;
}

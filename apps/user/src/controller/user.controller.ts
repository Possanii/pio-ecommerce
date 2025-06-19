import {Controller, Get} from '@nestjs/common';
import {UserUseCase} from "../usecase/user.usecase";

@Controller()
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get()
  getHello(): string {
    return this.userUseCase.getHello();
  }
}

import {Module} from '@nestjs/common';
import {UserController} from './controller/user.controller';
import {UserUseCase} from "./usecase/user.usecase";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserUseCase],
})
export class UserModule {}

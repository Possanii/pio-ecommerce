import {Injectable} from '@nestjs/common';

@Injectable()
export class PurchaseUseCase {
  getHello(): string {
    return 'Hello World!';
  }
}

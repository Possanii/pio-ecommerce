import {Injectable} from '@nestjs/common';

@Injectable()
export class ProductUseCase {
  getHello(): string {
    return 'Hello World!';
  }
}

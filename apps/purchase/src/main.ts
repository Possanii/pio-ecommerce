import { NestFactory } from '@nestjs/core';
import { PurchaseModule } from './purchase.module';

async function bootstrap() {
  const app = await NestFactory.create(PurchaseModule);
  await app.listen(3002);
}
bootstrap();

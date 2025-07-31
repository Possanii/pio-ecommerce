import { NestFactory } from '@nestjs/core';
import { PurchaseModule } from './purchase.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PurchaseModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3002);
}
bootstrap();

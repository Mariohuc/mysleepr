import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // If set to true validator will strip validated object (DTO) of any properties that do not have any decorators
  }));
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();

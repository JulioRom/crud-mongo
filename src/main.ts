import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PersonModule } from './person/person.module';

async function bootstrap() {
  const app = await NestFactory.create(PersonModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(3000);
}
bootstrap();

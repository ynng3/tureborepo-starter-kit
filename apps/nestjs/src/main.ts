import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 3002);

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  await app.listen(port);
  console.log(`Turborepo Starter Kit NestJS API listening on http://localhost:${port}`);
}

bootstrap();

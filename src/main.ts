import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.DB_PORT;

  await app.listen(3001);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const loggerWrapper = {
  logger: console,
};

export async function createApp(): Promise<INestApplication> {
  const logger = (loggerWrapper as any).logger;
  logger('we are starting');
  logger(process.env);
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  app.setGlobalPrefix('api');

  try {
    logger('app will init');
    await app.init();
    logger('app is OK');
    return app;
  } catch (e) {
    logger.error('app NOK', e);
  }
}

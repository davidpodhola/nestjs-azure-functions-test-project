import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const loggerWrapper = {
  logger: console,
};

export async function createApp(): Promise<INestApplication> {
  const logger = (loggerWrapper as any).logger;
  logger.verbose('we are starting');
  const app = await NestFactory.create(AppModule, {
    logger: (loggerWrapper as any).logger,
  });
  app.setGlobalPrefix('api');

  try {
    logger.verbose('app will init');
    await app.init();
    logger.verbose('app is OK');
    return app;
  } catch (e) {
    logger.error('app NOK', e);
  }
}

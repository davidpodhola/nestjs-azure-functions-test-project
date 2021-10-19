import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const loggerWrapper = {
  logger: console,
};

export async function createApp(): Promise<INestApplication> {
  const logger = (loggerWrapper as any).logger;
  logger.info('we are starting');
  logger.info(process.env);
  const app = await NestFactory.create(AppModule, {
    logger: (loggerWrapper as any).logger,
  });
  app.setGlobalPrefix('api');

  try {
    logger.info('app will init');
    await app.init();
    logger.info('app is OK');
    return app;
  } catch (e) {
    logger.info('app NOK', e);
  }
}

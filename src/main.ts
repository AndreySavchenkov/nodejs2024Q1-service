import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggingService);
  app.useGlobalPipes(new ValidationPipe());

  process.on('uncaughtException', (err: unknown) => {
    const error = err as Error;
    logger.error('Unhandled Exception', error.stack);
  });
  process.on('unhandledRejection', (err: unknown) => {
    const error = err as Error;
    logger.error('Unhandled Rejection', error.stack);
  });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();

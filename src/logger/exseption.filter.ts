import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from './logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(LoggingService) private readonly logger: LoggingService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    // Log the error
    if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack);
    } else {
      this.logger.error(exception);
    }

    // Send the response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

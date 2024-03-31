import {
  Injectable,
  NestMiddleware,
  LoggerService,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
export class LoggingService implements NestMiddleware, LoggerService {
  private logger = new Logger('CustomLogger');
  private logStream = fs.createWriteStream('application.log', { flags: 'a' });
  private errorLogStream = fs.createWriteStream('error.log', { flags: 'a' });

  log(message: any, context?: string) {
    const entry = `${new Date().toISOString()} - ${
      context || ''
    } - ${message}\n`;
    this.logStream.write(entry);
    this.logger.log(message);
  }

  error(message: any, trace?: string, context?: string) {
    const entry = `${new Date().toISOString()} - ${
      context || ''
    } - ${message} - Trace: ${trace}\n`;
    this.errorLogStream.write(entry);
    this.logger.error(message, { trace });
  }

  // log(message: any, context?: string) {
  //   this.logger.log(message);
  // }

  // error(message: any, trace?: string, context?: string) {
  //   this.logger.error(message, { trace });
  // }

  warn(message: any, context?: string) {
    this.logger.warn(message);
  }

  debug?(message: any, context?: string) {
    this.logger.debug(message);
  }

  verbose?(message: any, context?: string) {
    this.logger.verbose(message);
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body, query } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} - body: ${JSON.stringify(
          body,
        )} - query: ${JSON.stringify(query)}`,
      );
    });

    next();
  }
}

import { createLogger, format, type Logger, transports } from 'winston';
import { Injectable } from '@nestjs/common';

export interface ILoggerClient {
  log(message: string): void;
  info(message: string, meta?: Record<string, any>): void;
  warn(message: string, meta?: Record<string, any>): void;
  error(message: string, meta?: Record<string, any>): void;
  debug(message: string, meta?: Record<string, any>): void;
}

export const LOGGER_CLIENT_TOKEN = Symbol('LOGGER_CLIENT');

@Injectable()
export class LoggerClient implements ILoggerClient {
  private readonly instance: Logger;

  constructor() {
    if (!this.instance) {
      this.instance = createLogger({
        level: 'info',
        format: format.combine(
          format.timestamp(),
          format.json(),
          format.simple(),
          format.prettyPrint({ colorize: true }),
        ),
        transports: [new transports.Console()],
      });
    }
  }

  public log(message: string): void {
    this.instance.log({ message, level: 'info' });
  }

  public info(message: string, meta?: Record<string, any>): void {
    this.instance.info({
      message,
      ...(meta && { meta }),
      level: 'info',
    });
  }

  public warn(message: string, meta?: Record<string, any>): void {
    this.instance.warn({
      message,
      ...(meta && { meta }),
      level: 'warn',
    });
  }

  public error(message: string, meta?: Record<string, any>): void {
    this.instance.error({
      message,
      ...(meta && { meta }),
      level: 'error',
    });
  }

  public debug(message: string, meta?: Record<string, any>): void {
    this.instance.debug({
      message,
      ...(meta && { meta }),
      level: 'debug',
    });
  }
}

import winston from 'winston';
import { Request } from 'express';

export const genericErrorLogger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log' })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
  )
});

export function controllersErrorLogger(error: unknown, req: Request): void {
  const { method, path, params, query, body } = req;
  const message = `[${method}] ${path} - params: ${JSON.stringify(params)}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)} - ${error}`;

  genericErrorLogger.error(message);
}

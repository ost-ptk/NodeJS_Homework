import winston from 'winston';
import { NextFunction, Request, Response } from 'express';

export const genericLogger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
  )
});

export function apiMethodLoggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { method, path, params, query, body } = req;
  const message = `[${method}] ${path} - params: ${JSON.stringify(params)}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`;

  genericLogger.info(message);

  next();
}

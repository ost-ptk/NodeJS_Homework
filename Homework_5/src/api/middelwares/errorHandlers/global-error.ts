import { Request, Response, NextFunction } from 'express';
import { genericErrorLogger } from '../loggers';

export function globalErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err) {
    genericErrorLogger.error(`${err.name} - ${err.message}`);
    res.status(500).json({ error: `Failed to process request: ${err.name} ${err.message}` });
  }
  next();
}

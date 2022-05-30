import { Request } from 'express';

export interface CustomRequestBody<T> extends Request {
  body: T;
}

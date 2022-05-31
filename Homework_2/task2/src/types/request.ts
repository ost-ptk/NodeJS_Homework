import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

import { NewUserRequestBody, UpdateUserRequestBody } from './users';

export interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: NewUserRequestBody;
}

export interface UpdateUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UpdateUserRequestBody;
  [ContainerTypes.Params]: {
    id: string
  };
}

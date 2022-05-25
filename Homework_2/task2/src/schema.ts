import Joi from 'joi';
import {
  ContainerTypes,
  ValidatedRequestSchema,
} from 'express-joi-validation';

import { NewUserRequestBody, UpdateUserRequestBody } from './users';

export interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: NewUserRequestBody
}

export interface UpdateUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UpdateUserRequestBody
}

export const userRequestSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required()
})


export const updateUserRequestSchema = Joi.object({
  login: Joi.string(),
  password: Joi.string().alphanum(),
  age: Joi.number().min(4).max(130)
})

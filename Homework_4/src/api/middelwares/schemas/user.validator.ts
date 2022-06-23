import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const userRequestSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required()
});


const updateUserRequestSchema = Joi.object({
  login: Joi.string(),
  password: Joi.string().alphanum(),
  age: Joi.number().min(4).max(130)
});

export const userRequestValidator = validator.body(userRequestSchema);

export const updateUserRequestValidator = validator.body(updateUserRequestSchema);

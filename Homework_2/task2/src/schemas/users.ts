import Joi from 'joi';

export const userRequestSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required()
});


export const updateUserRequestSchema = Joi.object({
  login: Joi.string(),
  password: Joi.string().alphanum(),
  age: Joi.number().min(4).max(130)
});

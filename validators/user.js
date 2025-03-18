import Joi from "joi";

export const registerValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const loginValidator = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().optional().email(),
  password: Joi.string().required(),
});

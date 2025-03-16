import Joi from "joi";

export const registerValidator = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    middlename: Joi.string().optional(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
});

export const loginValidator = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
});


export const emailValidator = Joi.object({
    email: Joi.string().required().email(),
});

export const verifyUserValidator = Joi.object({
    email: Joi.string().required().email(),
    code: Joi.string().required(),
});
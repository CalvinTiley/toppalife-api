import Joi from "joi";

export const login = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const refresh = Joi.object().keys({
    refresh_token: Joi.string().required(),
});

export const validate = Joi.object().keys({
    access_token: Joi.string().required(),
});
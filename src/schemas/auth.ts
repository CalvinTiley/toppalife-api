import Joi from "joi";

export const login = Joi.object().keys({
    email: Joi.string().email().required().messages({ "any.required": "Email is required." }),
    password: Joi.string().required().messages({ "any.required": "Password is required." }),
});

export const refresh = Joi.object().keys({
    refresh_token: Joi.string().required(),
});

export const validate = Joi.object().keys({
    access_token: Joi.string().required(),
});
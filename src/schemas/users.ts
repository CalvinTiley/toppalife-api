import Joi from "joi";

export const create = Joi.object().keys({
    confirm_password: Joi.string().required()
        .equal(Joi.ref("password"))
        .messages({ "any.only": "Passwords do not match." }),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
});
import Joi from "joi";

export const user = Joi.object({
    user: {
        firstName: Joi.string().required,
        lastName: Joi.string().required,
        otherNames: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        userName: Joi.string(),
        termsAndConditions: Joi.string(),
    },

})
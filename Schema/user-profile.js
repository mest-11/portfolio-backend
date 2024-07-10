import Joi from "joi";

export const usersSchema = Joi.object({
    user: {
    firstName: Joi.string().required,
    lastName: Joi.string().required,
    otherName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    confirmedPassword: Joi.ref('password'),
    userName: Joi

    
    }
})


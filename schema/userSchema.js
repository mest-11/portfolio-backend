import joi from "joi";

export const usersSchema = joi.object({
    firstName: joi.string().required(),
    middleName: joi.string(),
    lastName: joi.string().required(),
    otherNames: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    confirmPassword: joi.ref("password"),
    userName: joi.string(),
    termsAndConditions: joi.boolean()
}).with("password", "confirmPassword");

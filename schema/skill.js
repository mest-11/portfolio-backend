import Joi from "joi";

export const skills = Joi.object({
    name: Joi.string(),
    levelOfProficiency: Joi.string()
})
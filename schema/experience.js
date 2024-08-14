import Joi from "joi";


export const experienceSchema = Joi.object({

    companyName: Joi.string(),
    role: Joi.string(),
    skills: Joi.string(),
    responsibility: Joi.array().items(Joi.string()),
    location: Joi.string(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    user: Joi.string()

});
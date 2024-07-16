import Joi from "joi";


export const volunteering = Joi.object({

    organisation: Joi.string(),
    description: Joi.string(),
    location: Joi.string(),
    skills: Joi.string(),
    role: Joi.string(),
    responsibility: Joi.string(),
    projectName: Joi.string(),
    startDate: Joi.string(),
    endDate: Joi.string()

})
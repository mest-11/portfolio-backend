import Joi from "joi";


export const volunteeringSchema = Joi.object({

    organisation: Joi.string().required(),
    description: Joi.string(),
    location: Joi.string(),
    skills: Joi.string(),
    role: Joi.string().required(),
    responsibility: Joi.string(),
    projectName: Joi.string(),
    startDate: Joi.date().required(),
    endDate: Joi.date()

});
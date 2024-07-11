import Joi from "joi";

export const achievements = Joi.object({

    achievements:{
    award: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    date: Joi.string(),
    nameOfOrganisation: Joi.string()
    }
})
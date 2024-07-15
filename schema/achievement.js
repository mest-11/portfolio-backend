import Joi from "joi";

export const achievementSchema = Joi.object({

    achievements:{
    award: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    date: Joi.string(),
    nameOfOrganisation: Joi.string()
    }
})
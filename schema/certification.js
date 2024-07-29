import Joi from "joi";

export const certificationSchema = Joi.object({
    award: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    date: Joi.string(),
    nameOfOrganisation: Joi.string(),
    user: Joi.string()
});
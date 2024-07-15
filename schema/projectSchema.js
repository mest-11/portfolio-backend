import joi from "joi";

export const projectSchema = joi.object({
    image: joi.string().required(),
    projectName: joi.string().required(),
    description: joi.string().required(),
    contributors: joi.string().required(),
    skills: joi.string().required(),
    link: joi.string().required(),
    nameOfOrganisation: joi.string().required(),
    startDate: joi.string().required(),
    endDate: joi.string(),
    user: joi.string().required()
})
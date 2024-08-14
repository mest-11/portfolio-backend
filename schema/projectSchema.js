import joi from "joi";

export const projectSchema = joi.object({
    image: joi.string(),
    projectName: joi.string(),
    description: joi.string(),
    contributors: joi.string(),
    skills: joi.string(),
    link: joi.string(),
    nameOfInstitution: joi.string(),
    startDate: joi.date(),
    endDate: joi.date(),
    user: joi.string()
});
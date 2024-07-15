import Joi from "joi";

export const projects =  Joi.object({
   
        projectName: Joi.string(),
        description: Joi.string(),
        contributors: Joi.string(),
        skills: Joi.string(),
        link: Joi.string(),
        nameOfOrganisation: Joi.string(),
        startDate: Joi.string(),
        endDate: Joi.string
    
})
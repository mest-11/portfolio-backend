import Joi from "joi";


export const volunteering = Joi.object({
   
            organisation: Joi.string(),
            description: Joi.string(),
            skills: Joi.string(),
            startDate: Joi.string(),
            endDate: Joi.string(),
            role: Joi.string(),
            responsibility: Joi.string(),
            location: Joi.string()
      
    
})
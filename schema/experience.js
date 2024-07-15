import Joi from "joi";


export const experience = Joi.object({
    experience: 
        {
            companyName: Joi.string(),
            role: Joi.string(),
            skills: Joi.string(),
            responsibility: Joi.string(),
            location: Joi.string(),
            startDate: Joi.string(),
            endDate: Joi.string()
        }
    
    
})
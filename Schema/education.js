import Joi from "joi";

 export const educationSchema = Joi.object({


        schoolName: Joi.string().required,
        location: Joi.string().required,
        program: Joi.string(),
        qualification: Joi.string(),
        grade: Joi.string(),
        startDate: Joi.string(),
        endDate: Joi.string()
    
})

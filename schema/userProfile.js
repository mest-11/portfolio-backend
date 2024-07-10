import Joi from "joi";
 export const userProfile = Joi.object({
    userProfile: {
        profilePicture: Joi.string(),
        location: Joi.string(),
        maritalStatus: Joi.string(),
        sex: Joi.string(),
        bio: Joi.string(),
        about: Joi.string(),
        dateOfBirth: Joi.string(),
        contact: Joi.string(),
        resume: Joi.string(),
        languages: Joi.string(),
        githubLink: Joi.string(),
        linkedInLink: Joi.string(),
        twitterLink: Joi.string()
    },
 })
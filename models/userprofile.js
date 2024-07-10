import { model, Schema } from "mongoose";

const userProfileSchema = new Schema({
    profilePicture: { type: String },
    location: { type: String },
    maritalStatus: { type: String, enum: ["single", "married", "prefer-not-to-say"] },
    sex: { type: String, enum: ["male", "female"] },
    bio: { type: String },
    about: { type: String },
    dateOfBirth: { type: Date },
    contact: { type: String },
    resume: { type: String },
    languages: { type: String },
    githubLink: { type: String },
    linkedInLink: { type: String },
    twitterLink: { type: String }
})

export const userModel = model('userProfile', userProfileSchema)
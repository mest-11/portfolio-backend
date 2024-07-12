import { model, Schema, Types } from "mongoose";

const experienceSchema = new Schema({

    companyName: { type: String },
    role: { type: String },
    skills: { type: String },
    responsibility: { type: String },
    location: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    user: { type: Types.ObjectId, ref: "User" }

})

export const userModel = model('Experience', experienceSchema)
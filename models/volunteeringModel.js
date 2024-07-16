import { model, Schema, Types } from "mongoose";

const volunteerSchema = new Schema({

    organisation: { type: String },
    description: { type: String },
    skills: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    role: { type: String },
    responsibility: { type: String },
    location: { type: String },
    user: { type: Types.ObjectId, ref: "User" }

})


export const volunteeringModel = model("Volunteer", volunteerSchema)
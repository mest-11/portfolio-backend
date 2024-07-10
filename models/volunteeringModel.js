import { model, Schema } from "mongoose";

const volunteerSchema = new Schema({
   
            organisation: { type: String },
            description: { type: String },
            skills: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            role: { type: String },
            responsibility: { type: String },
            location: { type: String }

})


export const userModel = model("User", volunteerSchema)
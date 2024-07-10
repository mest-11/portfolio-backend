import { model, Schema } from "mongoose";

const experienceSchema = new Schema({
  
    
            companyName: { type: String },
            role: { type: String },
            skills: { type: String },
            responsibility: { type: String },
            location: { type: String },
            startDate: { type: String },
            endDate: { type: String }
      
  
})

export const userModel = model('experience', experienceSchema)
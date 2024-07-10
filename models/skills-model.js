import { Schema } from "mongoose";

const skillsSchema = new Schema({
    
 
            name: { type: String },
            levelOfProficiency: { type: String, enum: ["beginner", "intermediate", "advanced", "expert"] }
   
})
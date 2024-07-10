import { model, Schema } from "mongoose";

const achievementsSchema = new Schema ({
   
            award: { type: String },
            description: { type: String },
            image: { type: String },
            date: { type: String },
            nameOfOrganisation: { type: String }
  
})


export const userModel = model("User", achievementsSchema)
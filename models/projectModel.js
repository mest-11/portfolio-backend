import { model, Schema, Types } from "mongoose";

const projectSchema = new Schema({

    projectName: { type: String },
    description: { type: String },
    contributors: { type: String },
    skills: { type: String },
    link: { type: String },
    nameOfOrganisation: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    user: { type: Types.ObjectId, ref: "User" }

})

export const projectModel = model("Project", projectSchema)
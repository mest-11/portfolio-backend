import { model, Schema, Types } from "mongoose";

const projectSchema = new Schema({
    image: { type: String },
    projectName: { type: String },
    description: { type: String },
    contributors: { type: String },
    skills: { type: String },
    link: { type: String },
    nameOfOrganisation: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    user: { type: Types.ObjectId, ref: "User" }
}, {
    timestamps: true
})

export const projectModel = model("Project", projectSchema)
import { model, Schema, Types } from "mongoose";

const achievementsSchema = new Schema({

    award: { type: String },
    description: { type: String },
    image: { type: String },
    date: { type: String },
    nameOfOrganisation: { type: String },
    user: { type: Types.ObjectId, ref: "User", select: false }

}, {
    timestamps: true
});


export const achievementModel = model("Achievement", achievementsSchema);
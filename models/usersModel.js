import { Schema } from "mongoose";

const usersSchema = new Schema({
    profilePicture: { type: String, required: true },
    about: { type: String },
    userName: { type: String, required: true, unique: true },
    experience: { type: String, }
})
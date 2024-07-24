import { model, Schema, Types } from "mongoose";

const usersSchema = new Schema({
        firstName: { type: String },
        lastName: { type: String },
        otherNames: { type: String },
        email: { type: String, unique: true, lowercase:true },
        password: { type: String },
        userName: { type: String,  unique: true, lowercase:true },
        termsAndConditions: { type: Boolean },
        education: [{ type: Types.ObjectId, ref: 'Education' }],
        skills: [{ type: Types.ObjectId, ref: 'Skill' }],
        achievements: [{ type: Types.ObjectId, ref: 'Achievement' }],
        projects: [{ type: Types.ObjectId, ref: 'Project' }],
        userProfile: { type: Types.ObjectId, ref: 'UserProfile' },
        volunteering: [{ type: Types.ObjectId, ref: 'Volunteer' }],
        experiences: [{ type: Types.ObjectId, ref: 'Experience' }],
}, {
        timestamps: true
});

export const userModel = model("User", usersSchema);
import { model, Schema } from "mongoose";

const usersSchema = new Schema({
    user: {
        firstName: { type: String },
        lastName: { type: String },
        otherNames: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        userName: { type: String, unique: true },
        termsAndConditions: { type: Boolean },
    },


    userProfile: {
        profilePicture: { type: String },
        location: { type: String },
        maritalStatus: { type: String, enum: ["single", "married", "prefer-not-to-say"] },
        sex: { type: String, enum: ["male", "female"] },
        bio: { type: String },
        about: { type: String },
        dateOfBirth: { type: Date },
        contact: { type: String },
        resume: { type: String },
        languages: { type: String }
    },

    socials: {
        githubLink: { type: String },
        linkedInLink: { type: String },
        twitterLink: { type: String }
    },

    skills: [
        {
            name: { type: String },
            levelOfProficiency: { type: String, enum: ["beginner", "intermediate", "advanced", "expert"] }
        }
    ],

    experience: [
        {
            companyName: { type: String },
            role: { type: String },
            skills: { type: String },
            responsibility: { type: String },
            location: { type: String },
            startDate: { type: String },
            endDate: { type: String }
        }
    ],

    education: [
        {
            schoolName: { type: String },
            location: { type: String },
            program: { type: String },
            qualification: { type: String },
            grade: { type: String },
            startDate: { type: STring },
            endDate: { type: String }
        }
    ],

    achievements: [
        {
            award: { type: String },
            description: { type: String },
            image: { type: String },
            date: { type: String },
            nameOfOrganisation: { type: String }
        }
    ],

    projects: [
        {
            projectName: { type: String },
            description: { type: String },
            contributors: { type: String },
            skills: { type: String },
            link: { type: String },
            nameOfOrganisation: { type: String },
            startDate: { type: String },
            endDate: { type: String }
        }
    ],

    volunteering: [
        {
            organisation: { type: String },
            description: { type: String },
            skills: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            role: { type: String },
            responsibility: { type: String },
            location: { type: String }
        }
    ]
})

export const userModel = model("User", usersSchema);
import { userProfileSchema } from "../schema/userProfileSchema.js";
import { userProfileModel } from "../models/userprofileModel.js";


export const addUserProfile = async (req, res, next) => {
    try {
        const { error, value } = userProfileSchema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }

        const newUserProfile = await userProfileModel.create(value);

        return res.status(201).json({ message: "User created successfully", userProfile: newUserProfile })

    } catch (error) {
        next(error);
    }
}
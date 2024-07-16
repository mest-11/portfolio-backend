import { userProfileSchema } from "../schema/userProfileSchema.js";
import { userProfileModel } from "../models/userprofileModel.js";
import { userModel } from "../models/usersModel.js";


export const createUserProfile = async (req, res, next) => {
    try {
        const { error, value } = userProfileSchema.validate({
            ...req.body,
            profilePicture: req.files.profilePicture[0].filename,
            resume: req.files.resume[0].filename
        });

        if (error) {
            return res.status(400).json(error.details[0].message);
        }

        const userSessionId = req.session?.user?.id || req?.user?.id;

        const user = await userModel.findById(userSessionId);

        if (!user) {
            res.status(401).json({ message: "User not found" })
        }

        const newUserProfile = await userProfileModel.create({
            ...value,
            user: userSessionId
        });

        user.userProfile = newUserProfile._id;

        await userModel.save();

        res.status(201).json({ message: "User created successfully", userProfile: newUserProfile })

    } catch (error) {
        next(error);
    }
}

export const updateUserProfile = async (req, res, next) => {
    try {
        const { error, value } = userProfileSchema.validate({
            ...req.body,
            profilePicture: req.files.profilePicture[0].filename,
            resume: req.files.resume[0].filename
        });
        if (error) {
            return res.status(400).json(error.details[0].message);
        }

        const userSessionId = req.session?.user?.id || req?.user?.id;

        const user = await userModel.findById(userSessionId);

        if (!user) {
            res.status(401).json({ message: "User not found" })
        }

        const profile = await userProfileModel.findByIdAndDelete(req.params.id, value, { new: true });
        if (!profile) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ profile })

    } catch (error) {
        next(error);
    }
}

export const getUserProfile = async (req, res, next) => {
    try {
        const userSessionId = req.session.user.id;

        const profile = await userProfileModel.find({ user: userSessionId });

        if (!profile) {
            return res.status(400).json({ message: "User could not be added" });
        }
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
}

export const deleteUserProfile = async (req, res, next) => {
    try {
        const { error, value } = userProfileSchema.validate(req.body);

        if(error) {
            return res.status(400).send(error.details[0].message);
        }

        const deletedProfile = await userProfileModel.findByIdAndUpdate(req.params.id);
        res.status(200).send(`Profile with ID ${deletedProfile} has been deleted`);
    } catch (error) {
        next(error);
    }
}


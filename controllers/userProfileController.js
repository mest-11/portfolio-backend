import { userProfileModel } from "../models/userprofileModel.js";
import { userModel } from "../models/usersModel.js";
import { userProfileSchema } from "../schema/userProfileSchema.js";


export const createUserProfile = async (req, res, next) => {
    try {
        const { error, value } = userProfileSchema.validate({
            ...req.body,
            profilePicture: req.files?.profilePicture[0].filename,
            resume: req.files?.resume[0].filename
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

        res.status(201).json({ newUserProfile })

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

        const profile = await userProfileModel.findByIdAndUpdate(req.params.id, value, { new: true });

        if (!profile) {
            return res.status(400).json({ message: "Profile not found" });
        }

        res.status(200).json({ profile });

    } catch (error) {
        next(error);
    }
}

export const getUserProfile = async (req, res, next) => {
    try {
        const userSessionId = req.session.user.id || req?.user?.id;

        const profile = await userProfileModel.findOne({ user: userSessionId })
            .populate({
                path: "user",
                select: "-password"
            });

        if (!profile) {
            return res.status(200).json({ profile });
        }

        res.status(200).json({ profile });

    } catch (error) {
        next(error);
    }
}

export const getOneUserProfile = async (req, res, next) => {
    try {
        const oneUser = userProfileModel.findById(req.params.id);

        if (!oneUser) {
            return res.status(200).json(oneUser);
        }

        res.status(200).json(oneUser);
    } catch (error) {
        next(error);
    }
}

export const deleteUserProfile = async (req, res, next) => {
    try {
        const userSessionId = req.session.user.id || req.user.id;

        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const deletedProfile = await userProfileModel.findByIdAndUpdate(req.params.id);

        if (!deletedProfile) {
            return res.status(404).json({ message: "User Profile not found" });
        }

        user.userProfile.pull(req.params.id);

        await user.save();

        res.status(200).send(`Profile with ID ${deletedProfile} has been deleted`);
    } catch (error) {
        next(error);
    }
}
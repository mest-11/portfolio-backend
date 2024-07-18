import { achievementModel } from "../models/achievement-model.js";
import { userModel } from "../models/usersModel.js";
import { achievementSchema } from "../schema/achievement.js";

export const getAchievement = async (req, res, next) => {
    try {

        const userSessionId = req.session?.user?.id || req?.user?.id;

        const allAchievement = await achievementModel.find({ user: userSessionId });

        if (allAchievement.length === 0) {
            return res.status(204).json({ Achievement: allAchievement })
        }

        res.status(201).json({ Achievement: allAchievement })
    } catch (error) {
        next(error)
    }
}

export const getAchievementByID = async (req, res, next) => {
    try {

        const achievementByID = await achievementModel.findById(req.params.id)

        if (achievementByID.length === 0) {
            return res.status(204).json({ Achievement: achievementByID });
        }

        res.status(201).json({ Achievement: achievementByID });
    } catch (error) {
        next(error);
    }
}


export const postAchievement = async (req, res, next) => {
    try {
        const { error, value } = achievementSchema.validate({
            ...req.body,
            image: req.file.filename
        });

        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const userSessionId = req.session?.user?.id || req?.user?.id;

        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(401).send("User not found")
        }

        const achievement = await achievementModel.create({
            ...value,
            user: userSessionId
        });

        user.achievements.push(achievement.id)

        await user.save();

        res.status(201).json({ achievement });

    } catch (error) {
        next(error);
    }
}


export const updateAchievement = async (req, res, next) => {
    try {
        const { error, value } = achievementSchema.validate({
            ...req.body,
            image: req.files.filename
        });

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session?.user?.id || req?.user.id;

        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const achievement = await achievementModel.findByIdAndUpdate(req.params.id, value, { new: true });

        if (!achievement) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ achievement });

    } catch (error) {
        next(error);
    }
}


export const deleteAchievement = async (req, res, next) => {
    try {
        const userSessionId = req.session?.user?.id || req?.user.id;

        const user = await userModel.findById(userSessionId);
        
        if (!user) {
            return res.status(204).send("User not found");
        }

        const achievement = await achievementModel.findByIdAndDelete(req.params.id);

        if (!achievement) {
            return res.status(204).json({ message: "Achievement not found" });
        }

        user.achievements.pull(req.params.id);

        await user.save();

        res.status(200).json("Achievement Deleted");

    } catch (error) {
        next(error);
    }
}

import { achievementModel } from "../models/achievement-models.js";
import { achievementSchema } from "../schema/achievement.js";
import { userModel } from "..models/usersModel.js";

export const getAchievement = async (req, res) => {

    try {
        const userSessionId = req.session.id
        const allAchievement = await achievementModel.find({ user: userSessionId });

        if (allAchievement.length == 0) {
            return res.status(400).send('No Achievement Added')
        }

        res.status(201).send({ Achievement: allAchievement })
    } catch (error) {
        res.status(500).json({ error })
    }
}



export const postAchievement = async (req, res) => {

    try {
        const { error, value } = achievementSchema.validate({
            ...req.body,
            award: req.files.award[0].filename,
            image: req.file.image[0].filename
        });
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionId);
        if (!user) {
            res.status(201).send("User not found")
        }

        const achievement = await achievementModel.create({ ...value, user: userSessionId });

        user.achievement.push(achievement._id)

        await user.save();

        res.status(201).json({ achievement });

    } catch (error) {
        console.log(error)
    }

}





export const patchAchievement = async (req, res) => {
    try {
        const { error, value } = achievementSchema.validate({
            ...req.body,
            award: req.file.award[0].filename,
            image: req.files.image[0].filename,
        });

        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json({ achievement })
    } catch (error) {
        return res.status(500).send(error)


    }
}

export const deleteAchievement = async (req, res) => {
    try {
        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send('Achievement not found');
        }

        user.achievements.pull(req.params.id);
        await user.save();

        res.status(200).json("Delete Achievement")
    } catch (error) {
        return res.status(500).send(error)
    }
}

import { experienceModel } from "../models/experience-models.js";
import { experienceSchema } from "../schema/experience.js";
import { userModel } from "../models/usersModel.js";


export const addExperience = async (req, res, next) => {
    try {
        const { error, value } = experienceSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const experience = await experienceModel.create(value)

        const userSessionId = req.session?.user?.id;

        const user = await userModel.findById(userSessionId);
        if (!user) {
            console.log(`User not found for ID: ${userSessionId}`)
            return res.status(404).send('User not found');
        }

        const userExperience = await experienceModel.create({ ...value, userSessionId });

        user.experiences.push(userExperience._id);

        await user.save();

        res.status(201).json({ experience: userExperience });

    } catch (error) {
        next(error);
    }
}

export const getAllExperience = async (req, res, next) => {
    try {
        const userSessionId = req.session?.user?.id || req?.user?.id;

        // Fetch all experiences that belong to the userSessionId
        const allExperiences = await Experience.find({ user: userSessionId });

        if (allExperiences.length === 0) {
            return res.status(200).json({ experiences: allExperiences });
        }

        res.status(200).json({ experiences: allExperiences });

    } catch (error) {
        next(error)
    }

}

export const getOneExperience = async (req, res) => {
    try {

        const experience = await experienceModel.findById(req.params.id);

        if (experience.length === 0) {
            return res.status(200).json({ Experiences: experience });
        }

        res.status(200).json({ Experiences: experience });

    } catch (error) {
        res.status(500).send(error)
    }
}

export const patchExperience = async (req, res) => {
    try {
        const { error, value } = userProfileSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(404).send("User not Found");
        }

        const experience = await Experience.findOneAndUpdate(req.params.id, value, { new: true });
        if (!experience) {
            return res.status(404).send("experience not found");
        }

        res.status(200).json({ experience })
    } catch (error) {
        res.status(500).send(error)
    }
}




export const deleteExperience = async (req, res) => {
    try {
        const userSessionId = req.session.id;
        const user = await userModel.findById(userSessionId);

        if (user) {
            return res.status(404).send("User not found");
        }

        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).send("experience not found");
        }

        user.experience.pull(req.params.id);


        res.status(200).json("Delete Experience")
    } catch (error) {
        res.status(500).json(error)
    }
}
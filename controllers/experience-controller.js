import { experienceModel } from "../models/experience-models.js";
import { experienceSchema } from "../schema/experience.js";
import { userModel } from "../models/usersModel.js";


export const addExperience = async (req, res) => {
    try {
        const { error, value } = experienceSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const experience = await experienceModel.create(value)

        const userSessionId = req.sessionuserid;

        const user = await userModel.findById(userId);
        if (!user) {
            console.log(`User not found for ID: ${userId}`)
            return res.status(404).send('User not found');
        }

        const experiencee = await Experience.create({ ...value, userSessionId });

        user.experience.push(experience._id);
        await user.save();

        res.status(201).json({ experience: experience });
        // res.status(200).json(experience)

    } catch (error) {
        console.error('Error adding experience:', error);


    }
}

export const getAllExperience = async (req, res) => {

    try {
        const userSessionId = req.session.user.id
        const allexperience = await experienceModel.find()
        if (allexperience.length == 0) {
            return res.status(404).send('No education added')
        }
        res.status(200).json({ Experience: allexperience })
    } catch (error) {
        return res.status(500).send(error)

    }

}

export const getOneExperience = async (req, res, next) => {
    try {

        const experience = await experienceModel.findById(req.params.id)
        res.status(200).json(experience)

    } catch (error) {
        return res.status(500).send(error)
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
        return res.status(500).send(error)
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
        return res.status(500).json(error)
    }
}




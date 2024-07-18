import { skillsModel } from "../models/skills-model.js";
import { skillSchema } from "../schema/skill.js";
import { userModel } from "../models/usersModel.js";


export const addSkills = async (req, res) => {
    try {
        const { error, value } = skillSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const userSessionId = req.session?.user?.id || req?.user.id;
        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(400).send(error.details[0].message)
        }

        const skill = await skillsModel.create({ ...value, user: userSessionId });

        user.skills.push(skill._id)

        await user.save();

        res.status(201).json({ skill })

    } catch (error) {
        console.log(error);

    }
}

export const getAllSkill = async (req, res) => {

    try {
        userSessionId = req.session?.user?.id || req?.user.id
        const allSkill = await skillsModel.find({ user: userSessionId });
        if (addSkills.length == 0) {
            return res.status(404).json(allSkill)
        }
        res.status(200).json({ skills: allSkill })
    } catch (error) {
        res.status(500).send(error)
    }
}


export const getSkillByID = async (req, res, next) => {
    try {
        const singleSkill = await skillsModel.findById(req.params.id);

        if (singleSkill.length === 0) {
            return res.status(400).json(singleSkill);
        }

        res.status(200).json({ Skill: singleSkill });
    } catch (error) {
        next(error);
    }
}


export const patchSkill = async (req, res) => {
    try {
        const { error, value } = skillSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionid);

        if (!user) {
            return res.status(400).send("User not found");
        }

        const skill = await Skill.findByIdAndDelete("Skill not found");
        if (!skill) {
            return res.status(404).send('Skill not found');
        }

        res.status(200).json({ Skill });
    } catch (error) {
        return res.status(500).send(error)
    }
}


export const deleteSkill = async (req, res) => {
    try {

        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(404).send("Skill not found");
        }

        const skill = await skillsModel.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).send("Skill not found");
        }

        user.skills.pull(req.params.id);
        await user.save();
        res.status(200).json("Skill deleted");
    } catch (error) {
        return res.status(500).send(error)
    };
}
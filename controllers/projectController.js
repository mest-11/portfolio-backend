import { projectModel } from "../models/projectModel.js";
import { userModel } from "../models/usersModel.js";
import { projectSchema } from "../schema/projectSchema.js";
import { userProfileSchema } from "../schema/userProfileSchema.js";


export const createProjects = async (req, res, next) => {
    try {
        const { error, value } = projectSchema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }

        const userSessionId = req.session.user.id;

        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(400).json("User not found");
        }

        // create a project with the value
        const newProject = await projectModel.create({
            ...value,
            user: userSessionId
        });

        user.projects.push(newProject._id);

        await user.save();

        res.status(201).json({ newProject });

    } catch (error) {
        next(error);
    }
}


export const getAllProjects = async (req, res, next) => {
    try {
        // get projects that belong to a user
        const userSessionId = req.session.user.id;

        const allProjects = await projectModel.find({ user: userSessionId });
        if (allProjects.length === 0) {
            res.status(404).send("No project added")
        }
        res.status(201).json({ projects: allProjects });
    } catch (error) {
        next(error);
    }
}

export const updateProject = async (req, res, next) => {
    try {
        const { error, value } = userProfileSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session.user.id;

        const user = await userModel.findById(userSessionId)

        if (!user) {
            return res.status(400).send("User not found");
        }

        const updateByID = await projectModel.findByIdAndUpdate(req.params.id, value, { new: true });

        if (!updateByID) {
            return res.status(400).send("Project not found");
        }


        res.status(201).json({ updateByID });
    } catch (error) {
        next(error);
    }
}

export const deleteProject = async (req, res, next) => {
    try {
        const userSessionId = req.session.user.id;

        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(400).send("User not found");
        }

        const deleteByID = await projectModel.findByIdAndDelete(req.params.id, { new: true });

        if (!deleteByID) {
            return res.status(400).send("Project not found");
        }
        user.projects.pull(req.params.id)

        await user.save();
        res.status(201).json("Project deleted");
    } catch (error) {
        next(error);
    }
}


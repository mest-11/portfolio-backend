import { projectSchema } from "../schema/projectSchema.js";
import { userModel } from "../models/usersModel.js";
import { projectModel } from "../models/projectModel.js";


export const createUserProject = async (req, res) => {
    try {
        const { error, value } = projectSchema.validate({
            ...req.body,
            image: req.file?.filename
        });

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session?.user?.id || req?.user?.id;

        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(204).send("User not found");
        }

        const project = await projectModel.create(
            {
                ...value,
                user: userSessionId
            }
        );

        user.projects.push(project.id)

        await user.save();

        res.status(201).json({ project });
    } catch (error) {
        console.log(error);
    }
};



export const getAllUserProjects = async (req, res) => {
    try {
        //  fetch projects belonging to a  user
        const userSessionId = req.session?.user?.id || req?.user.id;

        const allProject = await Project.find({ user: userSessionId });

        if (allProject.length == 0) {
            return res.status(200).json({ Projects: allProject });
        }

        res.status(200).json({ Projects: allProject });

    } catch (error) {
        return res.status(500).json({ error })
    }
};


export const getSingleProject = async (req, res, next) => {
    try {
        const singleProject = await projectModel.findById(req.params.id);

        if (singleProject.length === 0) {
            return res.status(200).json({ Project: singleProject });
        }

        res.status(200).json({ Project: singleProject });

    } catch (error) {
        next(error);
    }
}


export const updateUserProject = async (req, res) => {
    try {
        const { error, value } = projectSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const project = await Project.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!project) {
            return res.status(404).send("Project not found");
        }

        res.status(200).json({ project });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};


export const deleteUserProject = async (req, res) => {
    try {
        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).send("Project not found");
        }

        user.projects.pull(req.params.id);
        await user.save();
        res.status(200).json("Project deleted");
    } catch (error) {
        return res.status(500).json({ error })
    }
};

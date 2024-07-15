import { projectModel } from "../models/projectModel.js";
import { userModel } from "../models/usersModel.js";
import { projectSchema } from "../schema/projectSchema.js";


export const createProjects = async (req, res, next) => {
    try {
        const { error, value } = projectSchema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }

        const userSessionId = req.session.user.id;

        const user = await userModel.findById(userSessionId);
        if(!user) {
            return res.status(400).json("User not found");
        }

        // create a project with the value
        const newProject = await projectModel.create({
            ...value,
            image: req.file.filename,
            user: userSessionId
        });

        res.status(201).json(newProject);

    } catch (error) {
        next(error);
    }
}


export const getAllProjects = async (req, res, next) => {
    try {
        const allProjects = await projectModel.find();
        res.status(201).json(allProjects);
    } catch (error) {
        next(error);
    }
}

export const getSingleProject = async (req, res, next) => {
    try {
        const singleProfile = await projectModel.findById(req.params.id);
        res.status(201).json(singleProfile);
    } catch (error) {
        next(error);
    }
}

export const updateProject = async (req, res, next) => {
    try {
        const updateByID = await projectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(updateByID);
    } catch (error) {
        next(error);
    }
}

export const deleteProject = async (req, res, next) => {
    try {
        const deleteByID = await projectModel.findByIdAndDelete(req.params.id, req.body, { new: true });
        res.status(201).json(deleteByID)
    } catch (error) {
        next(error);
    }
}


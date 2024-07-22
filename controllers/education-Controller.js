import { educationSchema } from "../schema/education.js";
import { userModel } from "../models/usersModel.js";
import { educationModel } from "../models/educationModels.js";

//  add education for a user
export const addEducation = async (req, res, next) => {
    try {
        const { error, value } = educationSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        //find a user with the id that was passed when creating the education
        const userSessionId = req.session?.user?.id || req?.user?.id;

        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(204).send("User not found");
        }

        //create education with the content provided
        const education = await educationModel.create({ ...value, user: userSessionId });

        //if user is found, push the id of education created inside
        user.education.push(education._id);

        //save user with the education ID
        await user.save();

        //return education created
        res.status(201).json({ education });

    } catch (error) {
        next(error);
    }
}


// get all education of a user
export const getAllUserEducation = async (req, res, next) => {
    try {
        //fetch education for  a user
        const userSessionId = req.session?.user?.id || req?.user?.id;

        const alleducation = await educationModel.find({ user: userSessionId });

        if (alleducation.length === 0) {
            return res.status(200).json({ education: alleducation });
        }

        res.status(200).json({ education: alleducation });

    } catch (error) {
        next(error);
    }
}

export const getEducationByID = async (req, res, next) => {
    try {
        const singleEducation = await educationModel.findById(req.params.id)

        if (singleEducation.length === 0) {
            return res.status(200).json({ Education: singleEducation });
        }

        res.status(201).json({ Education: singleEducation });
    } catch (error) {
        next(error);
    }
}


// update an education of a user
export const updateUserEducation = async (req, res, next) => {
    try {
        const { error, value } = educationSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session?.user?.id || req?.user?.id;

        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        const updatedEducation = await educationModel.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true }
        );

        if (!updatedEducation) {
            return res.status(404).send("Education not found");
        }

        res.status(201).json({ Education: updatedEducation });
    } catch (error) {
        next(error)
    }
}


//  delete an education of a user
export const deleteUserEducation = async (req, res) => {
    try {
        const userSessionId = req.session?.user?.id || req?.user?.id;

        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        const education = await educationModel.findByIdAndDelete(req.params.id);

        if (!education) {
            return res.status(404).send("Education not found");
        }

        user.education.pull(req.params.id);

        await user.save();

        res.status(200).json("Education deleted");

    } catch (error) {
        next(error);
    }
}
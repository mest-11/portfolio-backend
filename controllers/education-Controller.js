import { educationModel } from "../models/educationModels.js";
import { educationSchema } from "../Schema/education.js";
import { userModel } from "../models/usersModel.js";


export const addEducation = async (req, res) => {

    try {
        const { error, value } = educationSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        console.log('userId', req.session.user.id)


        const userSessionId = req.session.user.id

        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }


        const education = await educationModel.create({ ...value, user: userSessionId });
        user.education.push(education._id);

        await user.save();


        res.status(201).json({ education });

    } catch (error) {
        return res.status(500).send(error)
    }



}



export const getAllEducation = async (req, res) => {

    try {
        const userSessionId = req.session.user.id
        const alleducation = await educationModel.find({ user: userSessionId });
        if (alleducation.length == 0) {
            return res.status(404).send('No education added')
        }
        res.status(200).json({ education: alleducation })
    } catch (error) {
        return res.status(500).send(error)

    }

}




export const patchEducation = async (req, res) => {
    try {
        const { error, value } = educationSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session.user.id;

        const user = await userModel.findById(userSessionId);

        if (!user) {


            res.status(404).send("User not found")
        }

        const Education = await Education.create({ ...value, user: userSessionId });

        user.education.push(education._id);

        await user.save();

        res.status(201).json({ education });


    } catch (error) {
        return res.status(500).send(error)


    }
}

export const deleteEducation = async (req, res) => {
    try {
        const { error, value } = educationSchema.validate(req.body);

        if (error) {
            return res.status(404).send(error.details[0].message)
        }
        const education = await educationModel.findByIdAndDelete(req.params.id);
        if (!education) {
            return res.status(404).send("Education")
        }
        user.education.pull(req.params.id);

        await user.save();
        res.status(200).json(eraseEducation)
    } catch (error) {
        return res.status(500).send(error)
    }
}







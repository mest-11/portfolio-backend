import { volunteeringModel } from "../models/volunteeringModel.js";
import { volunteering } from "../Schema/volunteer.js";
import { userModel } from "../models/usersModel.js";


export const addVolunteer = async (req, res) => {
    try {
        const { error, value } = volunteering.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const userSessionId = req.session.user.id;

        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(400).send(error.details[0].message);
        }

        const volunteering = await volunteeringModel.create({
            ...value,
            user: userSessionId,
        });
        user.volunteering.push(volunteering._id)

        await user.save();
        res.status(200).json({ volunteering })

    } catch (error) {
        console.log(eror);
    }
};

export const getAllVolunteer = async (req, res) => {

    try {
        const userSessionId = req.session.user.id;

        const allVolunteer = await volunteeringModel.find({ user: userSessionId });
        if (allVolunteer.length == 0) {
            return res.status(404).send('No Volunteer added')
        }
        res.status(200).json({ Volunteer: allVolunteer })
    } catch (error) {
        return res.status(500).send(error)

    }

}



export const patchVolunteer = async (req, res) => {
    try {
        const { error, value } = volunteeringSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const volunteering = await Volunteering.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true }
        );
        if (!volunteering) {
            return res.status(404).send("Volunteering not found");
        }
        res.status(200).json(updateOneVolunteer)
    } catch (error) {
        return res.status(500).json(error)
    }
}




export const deleteVolunteer = async (req, res) => {
    try {
        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const volunteering = await Volunteering.findByIdAndDelete(req.params.id);
        if (!volunteering) {
            return res.status(404).send("Volunteering not found");
        }

        user.volunteering.pull(req.params.id);
        await user.save();

        res.status(200).json("Volunteering deleted");
    } catch (error) {
        return res.status(500).send({ error })
    }
}




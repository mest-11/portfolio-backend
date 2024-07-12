import { userModel } from "../models/usersModel.js";
import { usersSchema } from "../schema/userSchema.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
    try {
        const { error, value } = usersSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const email = value.email // value.email because the req.body is in the value

        const ifUserExists = await userModel.findOne({ email });
        if (ifUserExists) {
            return res.status(401).send("User has already signed up");
        } else {
            const hashedPassword = bcrypt.hash(value.password, 10);
            value.password = hashedPassword;
            const newUser = await userModel.create(value);
            return res.status(201).send("User created successfully");
        }
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password, userName } = req.body;

        const user = await userModel.findOne({
            $or: [
                { email, userName }
            ]
        })

        if(!user) {
            return res.status(401).json({ message: "User not found" })
        }


    } catch (error) {

    }

}

export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const userDetails = await userModel
            .findById(userId)
            .select({ password: false })
            .populate("education");

        return res.status(201).json({ user: userDetails });
    } catch (error) {
        next(error);
    }
}
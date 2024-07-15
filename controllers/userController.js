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
            const hashedPassword = bcrypt.hashSync(value.password, 10);
            value.password = hashedPassword;

            const newUser = await userModel.create({
                ...value,
                password: hashedPassword
            });

            req.session.user = { id: newUser.id};

            return res.status(201).send(newUser);
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

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }


    } catch (error) {
        next(error);
    }

}

export const getUser = async (req, res, next) => {
    try {
        const userName = req.params.userName.toLowerCase();

        const options = { sort: { startDate: -1 } };

        const userDetails = await userModel
            .findOne({ userName })
            .populate({
                path: "education",
                options
            })
            .populate("userProfile")
            .populate("skills")
            .populate({
                path: "achievements",
                options
            })
            .populate({
                path: "experiences",
                options
            })
            .populate({
                path: "volunteering",
                options
            })
            .populate({
                path: "projects",
                options
            })

        return res.status(201).json({ user: userDetails });
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const email = req.query.email?.toLowerCase();
        const userName = req.query.userName?.toLowerCase();

        const filter = {}
        if (email) {
            filter.email = email;
        }

        if (userName) {
            filter.userName = userName
        }

        const users = await userModel.find(filter);

        res.status(200).json({ users })
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        // destroy user session
        await req.destroy.user()
        res.status(200).json({ message: "User successfully logged out" })
    } catch (error) {
        next(error);
    }
}
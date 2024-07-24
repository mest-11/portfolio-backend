import { userModel } from "../models/usersModel.js";
import { usersSchema } from "../schema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signup = async (req, res, next) => {
    try {
        const { error, value } = usersSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }


        const email = value.email
        const ifUserExists = await userModel.findOne({ email });

        if (ifUserExists) {
            return res.status(401).send("User has already signed up");
        } else {
            const hashedPassword = bcrypt.hashSync(value.password, 10);
            value.password = hashedPassword

            const newUser = await userModel.create(value);

            return res.status(201).send(newUser);
        }
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        //  Find a user using their email or username
        const user = await userModel.findOne({
            $or: [{ email: email }, { userName: userName }],
        });
        if (!user) {
            return res.status(401).json("User does not exist");
        }
        // Verify user password
        const correctPass = bcrypt.compareSync(value.password, user.password);
        if (!correctPass) {
            return res.status(401).json("Invalid credentials");
        }
        // Generate a session for the user
        req.session.user = { id: user.id };

        // Return response
        res.status(201).json("Login successful");
    } catch (error) {
        next(error);
    }
}


// Login user with token
export const token = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        //  Find a user using their email or username
        const user = await userModel.findOne({
            $or: [
                { email: email }, { userName: userName }
            ]
        });
        if (!user) {
            return res.status(401).json("User does not exist");
        }
        // Verify user password
        const correctPass = bcrypt.compareSync(password, user.password);
        if (!correctPass) {
            return res.status(401).json("Invalid credentials");
        }

        // create token
        const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "1h" })


        res.status(200).json({
            message: "User logged in",
            accessToken: token
        })

    } catch (error) {
        next(error);
    }
}


export const getUser = async (req, res, next) => {
    try {
        const userName = req.params.userName.toLowerCase();

        console.log(userName);

        const options = { sort: { startDate: -1 } };

        const userDetails = await userModel
            .findOne({ userName })
            .select({ password: false })
            .populate({
                path: "education",
                options
            })
            .populate("userProfile")
            .populate("skills")
            .populate({
                path: "achievements",
                options: { sort: { date: -1 } }
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

            console.log('user', userDetails)
        if (!userDetails) {
            return res.status(400).json(userDetails)
        }

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
        await req.session.destroy();

        res.status(200).json({ message: "User successfully logged out" });
    } catch (error) {
        next(error);
    }
}
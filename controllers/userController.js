import { usersSchema } from "../schema/userValidation.js";

export const signup = (req, res, next) => {
    const { error, value } = usersSchema.validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
}
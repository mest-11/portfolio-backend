import { Router } from "express";
import { signup } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/users/signup", signup);

export default userRouter;

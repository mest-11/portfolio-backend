import { Router } from "express";
import { getUser, signup } from "../controllers/userController.js";

const usersRouter = Router();

usersRouter.post("/users/signup", signup);
usersRouter.get("/users", getUser);

export default usersRouter;

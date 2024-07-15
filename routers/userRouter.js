import { Router } from "express";
import { getAllUsers, getUser, login, signup } from "../controllers/userController.js";
import { createUserProfile, updateUserProfile } from "../controllers/userProfileController.js";
import { remoteUpload } from "../middleware/upload.js";
import { checkUserSession } from "../middleware/auth.js";

const usersRouter = Router();

usersRouter.post("/users/signup", signup);
usersRouter.get("/users/:userName", getUser);
usersRouter.post("/users/login", login);
usersRouter.get("/users", getAllUsers);
usersRouter.post("/users/userProfile",
    remoteUpload.fields(
        { name: "profilePicture", maxCount: 1 },
        { name: "resume", maxCount: 1 }), checkUserSession, createUserProfile
);
usersRouter.patch("/users/userProfile/:id",
    remoteUpload.fields(
        { name: "profilePicture", maxCount: 1 },
        { name: "resume", maxCount: 1 }), checkUserSession, updateUserProfile
);

export default usersRouter;

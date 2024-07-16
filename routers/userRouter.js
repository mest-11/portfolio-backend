import { Router } from "express";
import { getAllUsers, getUser, signup, token } from "../controllers/userController.js";
import { createUserProfile, updateUserProfile } from "../controllers/userProfileController.js";
import { remoteUpload } from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/auth.js";

const usersRouter = Router();

usersRouter.post("/users/signup", signup);
usersRouter.get("/users/:userName", getUser);
usersRouter.get("/users", getAllUsers);
usersRouter.post("/users/userProfile",
    remoteUpload.fields(
        { name: "profilePicture", maxCount: 1 },
        { name: "resume", maxCount: 1 }), isAuthenticated, createUserProfile
);
usersRouter.patch("/users/userProfile/:id",
    remoteUpload.fields(
        { name: "profilePicture", maxCount: 1 },
        { name: "resume", maxCount: 1 }), isAuthenticated, updateUserProfile
);

usersRouter.post("/users/login/token", token);

export default usersRouter;

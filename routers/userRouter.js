import { Router } from "express";
import { getAllUsers, getUser, login, logout, signup, token } from "../controllers/userController.js";
import { createUserProfile, updateUserProfile } from "../controllers/userProfileController.js";
import { remoteUpload } from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/auth.js";


const usersRouter = Router();

usersRouter.post("/users/auth/session/login", login);

usersRouter.post("/users/auth/token/login", token);

usersRouter.post("/users/auth/signup", signup);

usersRouter.post("/users/auth/logout", logout);

usersRouter.get("/users/auth/:userName", getUser);

usersRouter.get("/users/auth/:userName", isAuthenticated, getUser);

usersRouter.get("/users", getAllUsers);

usersRouter.post("/users/userProfile", isAuthenticated,
    remoteUpload.fields(
        { name: "profilePicture", maxCount: 1 },
        { name: "resume", maxCount: 1 }), createUserProfile
);

usersRouter.patch("/users/userProfile/:id", isAuthenticated,
    remoteUpload.fields(
        { name: "profilePicture", maxCount: 1 },
        { name: "resume", maxCount: 1 }), updateUserProfile
);

export default usersRouter;

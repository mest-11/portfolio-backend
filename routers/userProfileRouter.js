import { Router } from "express";
import { createUserProfile, deleteUserProfile, getUserProfile, updateUserProfile } from "../controllers/userProfileController.js";
import { remoteUpload } from "../middleware/upload.js";
import { checkUserSession } from "../middleware/auth.js";

const profileRouter = Router();

profileRouter.post("/users/profiles", remoteUpload.fields(
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 }
), checkUserSession, createUserProfile);

profileRouter.get("/users/profiles", checkUserSession, getUserProfile);

profileRouter.patch("/users/profile/:id", checkUserSession, remoteUpload.fields(
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 }
), updateUserProfile);

profileRouter.delete("/profile/:id", checkUserSession, deleteUserProfile);

export default profileRouter;

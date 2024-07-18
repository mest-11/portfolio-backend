import { Router } from "express";
import { createUserProfile, deleteUserProfile, getOneUserProfile, getUserProfile, updateUserProfile } from "../controllers/userProfileController.js";
import { remoteUpload } from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/auth.js";


const profileRouter = Router();

profileRouter.post('/users/profiles', isAuthenticated, remoteUpload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'resume', maxCount: 1 }]), createUserProfile
);

profileRouter.get('/users/profiles', isAuthenticated, getUserProfile);

profileRouter.get("/users/profiles/:id", isAuthenticated, getOneUserProfile);

profileRouter.patch('/users/profiles/:id', isAuthenticated, remoteUpload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'resume', maxCount: 1 }]), updateUserProfile
);

profileRouter.delete('/users/profiles/:id', isAuthenticated, deleteUserProfile);

export default profileRouter;
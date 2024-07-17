import { Router } from "express";
import { createUserProfile, deleteUserProfile, getUserProfile, updateUserProfile } from "../controllers/userProfileController.js";
import { remoteUpload } from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/auth.js";


const profileRouter = Router();

profileRouter.post('/users/profiles', remoteUpload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'resume', maxCount: 1 }]), isAuthenticated, createUserProfile
);

profileRouter.get('/users/profiles', isAuthenticated, getUserProfile);

profileRouter.patch('/users/profiles/:id', isAuthenticated, remoteUpload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'resume', maxCount: 1 }]), updateUserProfile
);

profileRouter.delete('/users/profiles/:id', isAuthenticated, deleteUserProfile);

export default profileRouter;
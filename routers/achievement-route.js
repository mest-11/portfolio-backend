import { Router } from "express";
import { deleteAchievement, getAchievement, postAchievement, updateAchievement } from "../controllers/achievement-controller.js";
import { isAuthenticated } from "../middleware/auth.js";
import { remoteUpload } from "../middleware/upload.js";

const achievementRouter = Router();

achievementRouter.get('/users/achievement', isAuthenticated, getAchievement);

achievementRouter.post('/users/achievement', isAuthenticated, remoteUpload.single("image"), postAchievement);

achievementRouter.patch('/users/achievement/:id', isAuthenticated, remoteUpload.single("image"), updateAchievement);

achievementRouter.delete('/users/achievement/:id', isAuthenticated, deleteAchievement);

export default achievementRouter;
import { Router } from "express";
import { deleteAchievement, getAchievement, postAchievement, updateAchievement } from "../controllers/achievement-controller.js";
import { isAuthenticated } from "../middleware/auth.js";
import { remoteUpload } from "../middleware/upload.js";

const achievementRouter = Router();

achievementRouter.get('/users/achievements', isAuthenticated, getAchievement);

achievementRouter.post('/users/achievements', isAuthenticated, remoteUpload.single("image"), postAchievement);

achievementRouter.patch('/users/achievements/:id', isAuthenticated, remoteUpload.single("image"), updateAchievement);

achievementRouter.delete('/users/achievements/:id', isAuthenticated, deleteAchievement);

export default achievementRouter;
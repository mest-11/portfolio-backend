import { Router } from "express";
import { deleteAchievement, getAchievement, getAchievementByID, postAchievement, updateAchievement } from "../controllers/achievement-controller.js";
import { isAuthenticated } from "../middleware/auth.js";
import { remoteUpload } from "../middleware/upload.js";

const achievementRouter = Router();

achievementRouter.get('/users/achievements', isAuthenticated, getAchievement);

// get achievement by ID
achievementRouter.get("/users/achievements/:id", isAuthenticated, getAchievementByID)

achievementRouter.post('/users/achievements', isAuthenticated, remoteUpload.single("image"), postAchievement);

achievementRouter.patch('/users/achievements/:id', isAuthenticated, remoteUpload.single("image"), updateAchievement);

achievementRouter.delete('/users/achievements/:id', isAuthenticated, deleteAchievement);

export default achievementRouter;
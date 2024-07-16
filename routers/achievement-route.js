import { Router } from "express";
import { deleteAchievement, getAchievement, patchAchievement, postAchievement } from "../controllers/achievement-controller.js";
import { checkUserSession } from "../middleware/auth.js";
import { remoteUpload } from "../middleware/upload.js";

export const achievementRouter = Router()

achievementRouter.get('/users/achievement', checkUserSession, getAchievement);

achievementRouter.post('/users/achievement',checkUserSession, remoteUpload.single("image"), postAchievement);

achievementRouter.patch('/users/achievement/:id',checkUserSession, remoteUpload.single("image"), patchAchievement);

achievementRouter.delete('/users/achievement/:id',checkUserSession, deleteAchievement);
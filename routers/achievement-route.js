import { Router } from "express";
import { deleteAchievement, getAchievement, patchAchievement, postAchievement } from "../controllers/achievement-controller.js";

export const achievementRouter = Router()

achievementRouter.get('/achievement', getAchievement);

achievementRouter.post('/achievement', postAchievement);

achievementRouter.patch('/achievement/id', patchAchievement);

achievementRouter.delete('/achievement/id', deleteAchievement);
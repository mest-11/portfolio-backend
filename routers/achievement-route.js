import { Router } from "express";
import { getAchievement, postAchievement } from "../controllers/achievement-controller.js";

export const achievementRouter = Router()

achievementRouter.get('/achievement', getAchievement);

achievementRouter.post('/achievement', postAchievement);
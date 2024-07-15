import { Router } from "express";
import { deleteVolunteer, getAllVolunteer, patchOneVolunteer } from "../controllers/volunteer-controller.js";
import { postAchievement } from "../controllers/achievement-controller.js";

export const volunteerRouter = Router();


volunteerRouter.get('/volunteer', getAllVolunteer);

volunteerRouter.post('/volunteer', postAchievement);

volunteerRouter.patch('/volunteer', patchOneVolunteer);

volunteerRouter.delete('/volunteer', deleteVolunteer);
import { Router } from "express";
import { addVolunteer, deleteVolunteer, getAllVolunteer,  patchVolunteer } from "../controllers/volunteer-controller.js";
import { checkUserSession } from "../middleware/auth.js";


export const volunteerRouter = Router();


volunteerRouter.get('/users/volunteer', checkUserSession, getAllVolunteer);

volunteerRouter.post('/user/volunteer', checkUserSession, addVolunteer);

volunteerRouter.patch('/user/volunteer/:id', checkUserSession, patchVolunteer);

volunteerRouter.delete('/user/volunteer/:id', checkUserSession, deleteVolunteer);
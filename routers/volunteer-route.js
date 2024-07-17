import { Router } from "express";
import { addVolunteer, deleteVolunteer, getAllVolunteer,  patchVolunteer } from "../controllers/volunteer-controller.js";
import { isAuthenticated } from "../middleware/auth.js";


const volunteerRouter = Router();

volunteerRouter.get('/users/volunteer', isAuthenticated, getAllVolunteer);

volunteerRouter.post('/users/volunteer', isAuthenticated, addVolunteer);

volunteerRouter.patch('/users/volunteer/:id', isAuthenticated, patchVolunteer);

volunteerRouter.delete('/users/volunteer/:id', isAuthenticated, deleteVolunteer);

export default volunteerRouter;
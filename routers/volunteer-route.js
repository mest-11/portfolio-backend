import { Router } from "express";
import { addVolunteer, deleteVolunteer, getAllVolunteer,  getVolunteerByID,  patchVolunteer } from "../controllers/volunteer-controller.js";
import { isAuthenticated } from "../middleware/auth.js";


const volunteerRouter = Router();

volunteerRouter.get('/users/volunteering', isAuthenticated, getAllVolunteer);

// get volunteer by ID
volunteerRouter.get("/users/volunteering/:id", isAuthenticated, getVolunteerByID);

volunteerRouter.post('/users/volunteering', isAuthenticated, addVolunteer);

volunteerRouter.patch('/users/volunteering/:id', isAuthenticated, patchVolunteer);

volunteerRouter.delete('/users/volunteering/:id', isAuthenticated, deleteVolunteer);

export default volunteerRouter;
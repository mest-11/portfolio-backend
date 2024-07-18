import { Router } from "express";
import { addExperience, deleteExperience, getAllExperience, getOneExperience, patchExperience } from "../controllers/experience-controller.js";
import { isAuthenticated } from "../middleware/auth.js";


const experienceRouter = Router()

experienceRouter.get("/users/experiences", isAuthenticated, getAllExperience);

// get experience by id
experienceRouter.get("/users/experiences/:id", getOneExperience);

experienceRouter.post("/users/experiences", isAuthenticated, addExperience);

experienceRouter.patch('/users/experiences/:id', isAuthenticated, patchExperience);

experienceRouter.delete('/users/experiences/:id', isAuthenticated, deleteExperience);

export default experienceRouter;







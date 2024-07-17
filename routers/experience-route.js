import { Router } from "express";
import { addExperience, deleteExperience, getAllExperience, patchExperience } from "../controllers/experience-controller.js";
import { isAuthenticated } from "../middleware/auth.js";


const experienceRouter = Router()

experienceRouter.get("/users/experiences", isAuthenticated, getAllExperience);

experienceRouter.post("/users/experiences", isAuthenticated, addExperience);

experienceRouter.patch('/users/experiences/:id', isAuthenticated, patchExperience);

experienceRouter.delete('/users/experiences/:id', isAuthenticated, deleteExperience);

export default experienceRouter;







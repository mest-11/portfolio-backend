import { Router } from "express";
import { addExperience, deleteExperience, getAllExperience, patchExperience } from "../controllers/experience-controller.js";
import { isAuthenticated } from "../middleware/auth.js";


const experienceRouter = Router()

experienceRouter.get("/users/experience", isAuthenticated, getAllExperience);

experienceRouter.post("/users/experience", isAuthenticated, addExperience);

experienceRouter.patch('/users/experience/:id', isAuthenticated, patchExperience);

experienceRouter.delete('/users/experience/:id', isAuthenticated, deleteExperience);

export default experienceRouter;







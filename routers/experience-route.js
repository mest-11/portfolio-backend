import { Router } from "express";
import { addExperience, deleteExperience, getAllExperience, patchExperience } from "../controllers/experience-controller.js";
import { checkUserSession } from "../middleware/auth.js";


const experienceRouter = Router()

experienceRouter.get("/users/experience", checkUserSession, getAllExperience);

experienceRouter.post("/users/experience", checkUserSession, addExperience);

experienceRouter.patch('/users/experience/:id', checkUserSession, patchExperience);

experienceRouter.delete('/users/experience/:id', checkUserSession, deleteExperience);

export default experienceRouter;







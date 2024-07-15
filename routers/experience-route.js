import { Router } from "express";
import { addExperience, deleteExperience, getAllExperience, patchExperience } from "../controllers/experience-controller.js";

const experienceRouter = Router()

experienceRouter.get("/experience", getAllExperience);
experienceRouter.post("/experience", addExperience);
experienceRouter.patch('/experience/:id', patchExperience);
experienceRouter.delete('/experience/:id', deleteExperience);

export default experienceRouter;







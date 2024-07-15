import { Router } from "express";
import { addSkills, deleteSkill, getAllSkill, patchSkill } from "../controllers/skill-controller.js";


export const skillRouter = Router();

skillRouter.get('/skill', getAllSkill);

skillRouter.post('/skill', addSkills);

skillRouter.patch('/skill/id', patchSkill);

skillRouter.delete('/skill/id', deleteSkill);
import { Router } from "express";
import { addSkills, deleteSkill, getAllSkill, patchSkill } from "../controllers/skill-controller.js";


const skillRouter = Router();

skillRouter.get('/users/skills', getAllSkill);

skillRouter.post('/users/skills', addSkills);

skillRouter.patch('/users/skills/:id', patchSkill);

skillRouter.delete('/users/skills/:id', deleteSkill);

export default skillRouter;
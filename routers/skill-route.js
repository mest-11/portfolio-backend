import { Router } from "express";
import { addSkills, deleteSkill, getAllSkill, patchSkill } from "../controllers/skill-controller.js";


const skillRouter = Router();

skillRouter.get('/users/skill', getAllSkill);

skillRouter.post('/users/skill', addSkills);

skillRouter.patch('/users/skill/:id', patchSkill);

skillRouter.delete('/users/skill/:id', deleteSkill);

export default skillRouter;
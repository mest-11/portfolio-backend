import { Router } from "express";
import { addSkills, deleteSkill, getAllSkill, getSkillByID, patchSkill } from "../controllers/skill-controller.js";
import { isAuthenticated } from "../middleware/auth.js";


const skillRouter = Router();

skillRouter.get("/users/skills", isAuthenticated, getAllSkill);

skillRouter.get("/users/skills/:id", getSkillByID);

skillRouter.post('/users/skills', addSkills);

skillRouter.patch('/users/skills/:id', patchSkill);

skillRouter.delete('/users/skills/:id', deleteSkill);

export default skillRouter;
import { createUserProject, deleteUserProject, getAllUserProjects, getSingleProject, updateUserProject } from "../controllers/projectController.js";
import { isAuthenticated } from "../middleware/auth.js";
import { Router } from "express";


const projectRouter = Router();

projectRouter.post('/users/projects', isAuthenticated, createUserProject);

projectRouter.get('/users/projects', isAuthenticated, getAllUserProjects);

// get project by id
projectRouter.get("/users/projects/:id", isAuthenticated, getSingleProject);

projectRouter.patch('/users/projects/:id', isAuthenticated, updateUserProject);

projectRouter.delete('/users/projects/:id', isAuthenticated, deleteUserProject);

export default projectRouter;
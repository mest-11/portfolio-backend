import { Router } from "express";
import { createProjects, deleteProject, getAllProjects, /* getSingleProject, */ updateProject } from "../controllers/projectController.js";
import { isAuthenticated } from "../middleware/auth.js";

const projectRouter = Router();

// add projects
projectRouter.post("/users/projects", isAuthenticated, createProjects);

// get all projects
projectRouter.get("/users/projects", isAuthenticated, getAllProjects);

// get projects by id
// projectRouter.get("/users/projects/:id", isAuthenticated, getSingleProject);

// delete project
projectRouter.delete("/users/projects", isAuthenticated, deleteProject);

// update project by id
projectRouter.patch("/users/projects", isAuthenticated, updateProject);

export default projectRouter;

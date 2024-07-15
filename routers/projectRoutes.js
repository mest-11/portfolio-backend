import { Router } from "express";
import { createProjects, deleteProject, getAllProjects, /* getSingleProject, */ updateProject } from "../controllers/projectController.js";
import { checkUserSession } from "../middleware/auth.js";

const projectRouter = Router();

// add projects
projectRouter.post("/users/projects", checkUserSession, createProjects);

// get all projects
projectRouter.get("/users/projects", checkUserSession, getAllProjects);

// get projects by id
// projectRouter.get("/users/projects/:id", checkUserSession, getSingleProject);

// delete project
projectRouter.delete("/users/projects", checkUserSession, deleteProject);

// update project by id
projectRouter.patch("/users/projects", checkUserSession, updateProject);

export default projectRouter;

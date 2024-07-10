import { Router } from "express";
import { deleteProject, getAllProjects, getSingleProject, updateProject } from "../controllers/projectController";

const projectRouter = Router();

// get all projects
projectRouter.get("/projects", getAllProjects);

// get projects by id
projectRouter.get("/projects", getSingleProject);

// delete project
projectRouter.delete("/projects", deleteProject);

// update project by id
projectRouter.patch("/projects", updateProject);

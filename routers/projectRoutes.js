import { Router } from "express";
import { createProjects, deleteProject, getAllProjects, getSingleProject, updateProject } from "../controllers/projectController.js";
import { remoteUpload } from "../middleware/upload.js";

const projectRouter = Router();

// add projects
projectRouter.post("/projects", remoteUpload.single("image"), createProjects);

// get all projects
projectRouter.get("/projects", getAllProjects);

// get projects by id
projectRouter.get("/projects/:id", getSingleProject);

// delete project
projectRouter.delete("/projects", deleteProject);

// update project by id
projectRouter.patch("/projects", updateProject);

export default projectRouter;

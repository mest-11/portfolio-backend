import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { deleteUserEducation, addEducation, getAllUserEducation, updateUserEducation, getEducationByID } from "../controllers/education-Controller.js";


const educationRouter = Router()

educationRouter.get('/users/education', getAllUserEducation);

// get education by id
educationRouter.get("/users/education/:id", getEducationByID);

educationRouter.post('/users/education', isAuthenticated, addEducation);

educationRouter.patch('/users/education/:id', isAuthenticated, updateUserEducation);

educationRouter.delete('/users/education/:id', isAuthenticated, deleteUserEducation);

export default educationRouter;


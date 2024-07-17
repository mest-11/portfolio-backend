import { Router } from "express";
import { addEducation, deleteEducation, getAllEducation, patchEducation, } from '../controllers/education-Controller.js'
import { isAuthenticated } from "../middleware/auth.js";


const educationRouter = Router()

educationRouter.get('/users/education', getAllEducation);

educationRouter.post('/users/education', isAuthenticated, addEducation);

educationRouter.patch('/users/education/:id', isAuthenticated, patchEducation);

educationRouter.delete('/users/education/:id', isAuthenticated, deleteEducation);

export default educationRouter;


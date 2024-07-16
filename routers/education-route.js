import { Router } from "express";
import {addEducation, deleteEducation, getAllEducation, patchEducation, } from '../controllers/education-Controller.js'
import { checkUserSession } from "../middleware/auth.js";



export const educationRouter = Router()

educationRouter.get('/users/education', getAllEducation);

educationRouter.post('/users/education',checkUserSession, addEducation);

educationRouter.patch('/users/education/:id', checkUserSession, patchEducation);

educationRouter.delete('/users/education/:id', checkUserSession, deleteEducation);


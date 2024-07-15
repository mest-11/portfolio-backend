import { Router } from "express";
import {addEducation, getAllEducation} from '../controllers/education-Controller.js'



export const educationRouter = Router()

educationRouter.get('/education', getAllEducation);

educationRouter.post('/education', addEducation);


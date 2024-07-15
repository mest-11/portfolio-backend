import express from "express";
import mongoose from "mongoose";
import { achievementRouter } from "./routers/achievement-route.js";
import { educationRouter } from "./routers/education-route.js";
import { skillRouter } from "./routers/skill-route.js";
import { volunteerRouter } from "./routers/volunteer-route.js";
import "dotenv/config";
import experienceRouter from "./routers/experience-route.js";


await mongoose.connect(process.env.Mongo_Url);



const app = express();

app.use(express.json());


//use Router
app.use(achievementRouter);
app.use(educationRouter);
app.use(skillRouter);
app.use(volunteerRouter);
app.use(experienceRouter)



const port = process.env.PORT || 2024

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})
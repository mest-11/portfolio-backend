import express from "express";
import mongoose from "mongoose";
import { Router } from "express";
import { achievementRouter } from "./routers/achievement-route.js";

const app = express();

app.use(express.json());



//use Router
app.use(achievementRouter)



const port = process.env.PORT || 2024

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})
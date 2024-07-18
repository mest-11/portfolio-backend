import express from "express";
import session from "express-session";
import expressOasGenerator from '@mickeymond/express-oas-generator';
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "dotenv/config";
import cors from "cors"
import educationRouter from "./routers/education-route.js";
import usersRouter from "./routers/userRouter.js";
import profileRouter from "./routers/userProfileRouter.js";
import projectRouter from "./routers/projectRouter.js";
import achievementRouter from "./routers/achievement-route.js";
import experienceRouter from "./routers/experience-route.js";
import skillRouter from "./routers/skill-route.js";
import volunteerRouter from "./routers/volunteer-route.js";


// connect to DB
await mongoose.connect(process.env.MONGO_URL);


const app = express();

expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth', 'userProfile', 'skills', 'projects', 'volunteering', 'experiences', 'education', 'achievements'],
    mongooseModels: mongoose.modelNames(),
});

// apply middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
    // cookie: { secure: true }
}))


// use routes
app.use("/api/v1", usersRouter)
app.use("/api/v1", profileRouter);
app.use("/api/v1", projectRouter);
app.use("/api/v1", educationRouter);
app.use("/api/v1", achievementRouter);
app.use("/api/v1", experienceRouter);
app.use("/api/v1", skillRouter);
app.use("/api/v1", experienceRouter);
app.use("/api/v1", volunteerRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect("/api-docs/"));


const port = process.env.PORT || 2024;

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
import express from "express";
import usersRouter from "./routers/userRouter.js";
import profileRouter from "./routers/userProfileRouter.js";
import projectRouter from "./routers/projectRoutes.js";
import session from "express-session";
import expressOasGenerator from '@mickeymond/express-oas-generator';
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "dotenv/config";

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
app.use(express.static("portfolio"));

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

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect("/api-docs/"));

//use Router
app.use(achievementRouter)



const port = process.env.PORT || 2024

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
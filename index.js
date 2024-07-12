import express from "express";
import usersRouter from "./routers/userRouter.js";
import profileRouter from "./routers/userProfileRouter.js";
import projectRouter from "./routers/projectRoutes.js";

const app = express();

app.use(express.json());


app.use("/api/v1", usersRouter)
app.use(profileRouter);
app.use(projectRouter);

const port = process.env.PORT || 2024

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})
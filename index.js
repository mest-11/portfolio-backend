import express from "express";
import userRouter from "./routers/userRouter.js";

const app = express();

app.use(express.json());


app.use("/api/v1", userRouter)

const port = process.env.PORT || 2024

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})
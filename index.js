import express from "express";

const app = express();

app.use(express.json());



const port = process.env.PORT || 2024

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})
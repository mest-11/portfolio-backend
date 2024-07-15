import { Router } from "express";
import { createUserProfile } from "../controllers/userProfileController.js";

const profileRouter = Router();

profileRouter.post("/profile", createUserProfile);
profileRouter.get("/profile", );
profileRouter.patch("/profile/:id", );
profileRouter.delete("/profile/:id", );

export default profileRouter;

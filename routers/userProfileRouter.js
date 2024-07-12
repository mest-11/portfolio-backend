import { Router } from "express";
import { addUserProfile } from "../controllers/userProfileController.js";

const profileRouter = Router();

profileRouter.post("/profile", addUserProfile);
profileRouter.get("/profile", );
profileRouter.patch("/profile/:id", );
profileRouter.delete("/profile/:id", );

export default profileRouter;

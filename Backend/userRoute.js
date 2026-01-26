import { Router } from "express";
import {
  UserSignIn,
  userSignUp,
  getUserProfile,
  userLogout,
} from "./controller/controller.js";

const userRoute = Router();

userRoute.post("/signup", userSignUp);
userRoute.post("/signin", UserSignIn);
userRoute.get("/profile", getUserProfile);
userRoute.get("/me", getUserProfile); // Alias for /profile to match frontend expectations
userRoute.post("/logout", userLogout);

export default userRoute;

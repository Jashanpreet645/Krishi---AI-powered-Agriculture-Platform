import { Router } from "express";
import {
  UserSignIn,
  userSignUp,
  getUserProfile,
  userLogout,
} from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/signup", userSignUp);
authRoutes.post("/signin", UserSignIn);
authRoutes.get("/profile", getUserProfile);
authRoutes.get("/me", getUserProfile); // Alias for /profile to match frontend expectations
authRoutes.post("/logout", userLogout);

export default authRoutes;


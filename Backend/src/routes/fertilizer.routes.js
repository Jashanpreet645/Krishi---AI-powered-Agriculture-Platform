import { Router } from "express";
import { validateFertilizer } from "../validators/fertilizer.validator.js";
import { recommend } from "../controllers/fertilizer.controller.js";

const router = Router();

router.post("/recommend", validateFertilizer, recommend);

export default router;

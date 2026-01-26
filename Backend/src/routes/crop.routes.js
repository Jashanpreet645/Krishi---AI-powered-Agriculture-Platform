import { Router } from "express";

import { validateCrop } from "../validators/crop.validator.js";

import { recommend } from "../controllers/crop.controller.js";

const router = Router();

router.post("/recommend", validateCrop, recommend);

export default router;

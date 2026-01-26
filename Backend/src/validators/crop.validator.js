import { checkSchema, validationResult, matchedData } from "express-validator";

const cropSchema = checkSchema(
  {
    Temperature: {
      in: ["body"],
      isFloat: { options: { min: -50, max: 80 } },
      toFloat: true,
      errorMessage: "Temperature -50..80",
    },
    Moisture: {
      in: ["body"],
      isFloat: { options: { min: 0, max: 1 } },
      toFloat: true,
      errorMessage: "Moisture 0..1",
    },
    Rainfall: {
      in: ["body"],
      isFloat: { options: { min: 0, max: 10000 } },
      toFloat: true,
    },
    PH: {
      in: ["body"],
      isFloat: { options: { min: 0, max: 14 } },
      toFloat: true,
    },
    Nitrogen: {
      in: ["body"],
      isFloat: { options: { min: 0, max: 1000 } },
      toFloat: true,
    },
    Phosphorous: {
      in: ["body"],
      isFloat: { options: { min: 0, max: 1000 } },
      toFloat: true,
    },
    Potassium: {
      in: ["body"],
      isFloat: { options: { min: 0, max: 1000 } },
      toFloat: true,
    },
    Carbon: {
      in: ["body"],
      isFloat: { options: { min: 0, max: 100 } },
      toFloat: true,
    },
    Soil: {
      in: ["body"],
      isString: true,
      trim: true,
      isLength: { options: { min: 2 } },
      errorMessage: "Soil required",
    },
  },
  ["body"]
);

export const validateCrop = [
  cropSchema,
  (req, res, next) => {
    const e = validationResult(req);
    if (!e.isEmpty())
      return res
        .status(422)
        .json({ message: "Validation failed", errors: e.array() });
    req.body = matchedData(req, { locations: ["body"] });
    next();
  },
];


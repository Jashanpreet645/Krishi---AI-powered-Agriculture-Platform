import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoute from "./userRoute.js";
import diseaseRoute from "./src/routes/disease.routes.js";
import cropRoutes from "./src/routes/crop.routes.js";
import fertilizerRoutes from "./src/routes/fertilizer.routes.js";
import { connection } from "./dbConnection/connextion.js";
import { errorHandler, notFound } from "./src/middleware/error.js";

import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

// Logging middleware
app.use(morgan("combined"));

// CORS middleware
app.use(
  cors({
    origin: ["http://localhost:8080", "https://krishi-backend-3.onrender.com", "https://krishi-frontend-beta.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API routes
app.use("/api/user", userRoute);
app.use("/api/disease", diseaseRoute);
app.use("/api/crop", cropRoutes);
app.use("/api/fertilizer", fertilizerRoutes);

// 404 handler for unknown routes
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

console.log("Calling database connection...");
connection();

const main = async function () {
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Server connected to port ${PORT}!`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
  console.log(
    `Disease detection endpoint: http://localhost:${PORT}/api/disease/detect`
  );
  console.log(
    `Crop recommendation endpoint: http://localhost:${PORT}/api/crop/recommend`
  );
  console.log(
    `Fertilizer recommendation endpoint: http://localhost:${PORT}/api/fertilizer/recommend`
  );
};
main().catch((err) => {
  console.error("Error starting server:", err);
});

dotenv.config();

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import { route } from "./routes/index.js";
import { ApiError } from "./utils/ApiError.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Database and server Connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running  at PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    "MongoDb connection error !! ", err;
  });

  // route

app.use("/api", route);






// Global error-handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusbar:err.statusCode,
      success: err.success,
      message: err.message,
      errors: err.errors
    });
  }

  // Handle non-ApiError cases (generic error handling)
  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

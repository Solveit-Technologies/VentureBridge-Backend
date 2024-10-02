import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const app = express();


import connectDB from "./config/db.js";

//Database Connection
// connectDB();

const PORT=process.env.PORT

app.listen(PORT, () => {
  console.log(`app is running PORT: ${PORT}`);
});

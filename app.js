const express = require("express");
require("dotenv").config();
import connectDB from "./config/db";

const app = express();

//Database Connection
connectDB();

const PORT=process.env.PORT

app.listen(PORT, () => {
  console.log(`app is running PORT: ${PORT}`);
});

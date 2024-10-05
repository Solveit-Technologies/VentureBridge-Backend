import express from "express";
import auth from "./auth.Route.js"
const route = express.Router();

route.use("/auth", auth)


export {route};
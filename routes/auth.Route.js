import express from "express";
const router = express.Router();
import AuthController from "../controller/auth.Controller.js";


router.post('/signup',AuthController.signUp);
router.post('/signin',AuthController.signIn);

export default router;

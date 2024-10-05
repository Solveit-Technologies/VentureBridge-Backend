import express from "express";
const router = express.Router();
import AuthController from "../controller/auth.Controller.js";


router.get('/signin',AuthController.signIn);
router.post('/signup',AuthController.signUp);

export default router;

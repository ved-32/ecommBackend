import express from "express";

import HandleErrors from "../middlewares/HandleErrors";

import validateSignUp from "../validation/signupValidation";
import validateLogin from "../validation/loginValidation";

import { login } from "../controllers/AuthController";
import { signup } from "../controllers/AuthController";

const authRoutes=express.Router()

authRoutes.post("/login",validateLogin,HandleErrors(login))
authRoutes.post("/signup",validateSignUp,HandleErrors(signup))

export default authRoutes



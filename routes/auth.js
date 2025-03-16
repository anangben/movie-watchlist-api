import { Router } from "express";
import {   register,login,verifyCode, verifyUser} from "../controllers/auth.js";


export const authRoute = Router()

authRoute.post("/register", register)
authRoute.post("/login", login)
authRoute.post("/send-verification-email", verifyCode)
authRoute.post("/verify-user", verifyUser)

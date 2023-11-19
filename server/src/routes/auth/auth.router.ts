import express from "express";

import { authValidator } from "./auth.validators";
import {
    httpRegisterUser,
    httpLoginUser,
    httpLogoutUser,
} from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/register", authValidator, httpRegisterUser);
authRouter.post("/login", authValidator, httpLoginUser);
authRouter.get("/logout", httpLogoutUser);

export default authRouter;

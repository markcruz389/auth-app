import express from "express";

import { authValidator } from "./auth.validators";
import { httpRegisterUser, httpLoginUser } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/register", authValidator, httpRegisterUser);
authRouter.post("/login", authValidator, httpLoginUser);

export default authRouter;

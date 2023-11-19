import express from "express";

import { registerValidator, loginValidator } from "./auth.validators";
import {
    httpRegisterUser,
    httpLoginUser,
    httpLogoutUser,
} from "./auth.controller";
import inputValidationChecker from "../../middlewares/inputValidationChecker";

const authRouter = express.Router();

authRouter.post(
    "/register",
    registerValidator,
    inputValidationChecker,
    httpRegisterUser
);
authRouter.post(
    "/login",
    loginValidator,
    inputValidationChecker,
    httpLoginUser
);
authRouter.get("/logout", httpLogoutUser);

export default authRouter;

import express from "express";

import { httpRegisterUser } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/register", httpRegisterUser);

export default authRouter;

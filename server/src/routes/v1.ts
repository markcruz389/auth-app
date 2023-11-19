import express from "express";

import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";

const api = express.Router();

api.use("/auth", authRouter);
api.use("/user", userRouter);

export default api;

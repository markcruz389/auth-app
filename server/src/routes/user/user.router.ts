import express from "express";

import { updateUserValidator } from "./user.validator";
import { httpUpdateUser } from "./user.controller";
import inputValidationChecker from "../../middlewares/inputValidationChecker";
import sessionExistsChecker from "../../middlewares/sessionExistsChecker";

const userRouter = express.Router();

userRouter.put(
    "/:_id",
    sessionExistsChecker,
    updateUserValidator,
    inputValidationChecker,
    httpUpdateUser
);

export default userRouter;

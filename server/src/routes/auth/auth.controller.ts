import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcrypt";

import {
    getUserPasswordByEmail,
    getUserByEmail,
    registerUser,
} from "../../models/user/user.model";

const unauthenticated = (res: Response) => {
    return res.status(401).json({ message: "Invalid username or password" });
};

const httpRegisterUser = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { email, password } = matchedData(req);

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Email already registered" });
        }

        const user = await registerUser(email, password);
        if (!user) {
            return res.status(400).json({ message: "Registration failed" });
        }

        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const httpLoginUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = matchedData(req);

    const hashedPassword = await getUserPasswordByEmail(email);
    if (!hashedPassword) {
        return unauthenticated(res);
    }

    const isUserAuth = await bcrypt.compare(password, hashedPassword);
    if (!isUserAuth) {
        return unauthenticated(res);
    }

    return res.status(200).json({ message: "Successfully logged in" });
};

export { httpLoginUser, httpRegisterUser };

import { Request, Response } from "express";
import { matchedData } from "express-validator";
import bcrypt from "bcrypt";

import { getUserByEmail, registerUser } from "../../models/user/user.model";

const unauthenticated = (res: Response) => {
    return res.status(401).json({ message: "Invalid username or password" });
};

const httpRegisterUser = async (req: Request, res: Response) => {
    const { email, password, role, firstName, lastName } = matchedData(req);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
    }

    const user = await registerUser({
        email,
        password,
        role,
        firstName,
        lastName,
    });
    if (!user) {
        return res.status(400).json({ message: "Registration failed" });
    }

    return res.status(201).json(user);
};

const httpLoginUser = async (req: Request, res: Response) => {
    const { email, password } = matchedData(req);

    const user = await getUserByEmail(email);
    if (!user) {
        return unauthenticated(res);
    }

    const isUserAuth = await bcrypt.compare(password, user.password);
    if (!isUserAuth) {
        return unauthenticated(res);
    }

    // Sets session details
    req.session.user = { userId: user._id, role: user.role };

    return res.status(200).json({ message: "Successfully logged in" });
};

const httpLogoutUser = async (req: Request, res: Response) => {
    req.session.destroy((error) => {
        if (error) {
            console.error(error);
            throw error;
        }

        return res.status(200).json({ message: "Successfully logged out" });
    });
};

export { httpLoginUser, httpRegisterUser, httpLogoutUser };

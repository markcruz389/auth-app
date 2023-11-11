import { Request, Response } from "express";

import { registerUser } from "../../models/user/user.model";

const httpRegisterUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password requried" });
    }

    const data = await registerUser(email, password);

    return res.status(201).json({ ...data });
};

export { httpRegisterUser };

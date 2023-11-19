import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { updateUser } from "../../models/user/user.model";

const httpUpdateUser = async (req: Request, res: Response) => {
    const { _id, firstName, lastName } = matchedData(req);

    const user = await updateUser({ _id, data: { firstName, lastName } });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
};

export { httpUpdateUser };

import { Request, Response, NextFunction } from "express";

import { redisClient } from "../services/redis";

const sessionExistsChecker = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const sessionId = req.sessionID;

    const exists = await redisClient.exists(`session:${sessionId}`);
    if (!exists) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
};

export default sessionExistsChecker;

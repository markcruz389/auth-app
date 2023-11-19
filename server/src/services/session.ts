import session from "express-session";
import RedisStore from "connect-redis";

import { UserRole } from "../models/user/user.model";
import { redisClient } from "./redis";

// Sets session type
declare module "express-session" {
    interface SessionData {
        user: { userId: string; role: UserRole };
    }
}

const expressSession = session({
    name: process.env.REDIS_APP_NAME,
    secret: process.env.SESSION_SECRET as string,
    store: new RedisStore({
        client: redisClient,
        prefix: "session:",
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60 * 60 * 1000, httpOnly: true },
});

export default expressSession;

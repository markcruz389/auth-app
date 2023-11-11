import crypto from "node:crypto";

import users from "./user.schema";

const registerUser = async (email: string, password: string) => {
    // TODO - use bcrypt
    // const salt = crypto.randomBytes(16).toString("hex");
    // const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512");
    // const user = await users.create({ email, hash, salt });

    return { email, password };
};

export { registerUser };

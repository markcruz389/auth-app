import bcrypt from "bcrypt";

import users from "./user.schema";

type UserRole = "admin";

interface UserResult {
    _id: string;
    email: string;
    role: UserRole;
}

interface UserResultWithPassword extends UserResult {
    password: string;
}

const getUserByEmail = async (
    email: string
): Promise<UserResultWithPassword | undefined> => {
    const user = await users.findOne({ email }, { __v: 0 });
    if (!user) {
        return;
    }

    return {
        _id: user?._id,
        email: user.email,
        password: user.password,
        role: user.role,
    };
};

const registerUser = async (
    email: string,
    password: string,
    role: UserRole
): Promise<UserResult | undefined> => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const user = await users.create({ email, password: hash, role });
    return { _id: user._id, email, role };
};

export { getUserByEmail, registerUser, UserRole };

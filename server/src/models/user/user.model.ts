import bcrypt from "bcrypt";

import users from "./user.schema";

type User = {
    _id: string;
    email: string;
};

const getUserPasswordByEmail = async (
    email: string
): Promise<string | undefined> => {
    const user = await users.findOne({ email }, { __v: 0, _id: 0, email: 0 });
    if (!user) {
        return;
    }

    return user.password;
};

const getUserByEmail = async (email: string): Promise<User | undefined> => {
    const user = await users.findOne({ email }, { __v: 0 });
    if (!user) {
        return;
    }

    return { _id: user?._id, email: user.email };
};

const registerUser = async (
    email: string,
    password: string
): Promise<User | undefined> => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const user = await users.create({ email, password: hash });
    return { _id: user._id, email };
};

export { getUserPasswordByEmail, getUserByEmail, registerUser };

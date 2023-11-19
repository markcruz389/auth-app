import bcrypt from "bcrypt";

import users from "./user.schema";

type UserRole = "admin";

interface IUserResult {
    _id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
}

interface UserResultWithPassword extends IUserResult {
    password: string;
}

type CreateUserInput = {
    email: string;
    password: string;
    role: UserRole;
    firstName: string;
    lastName: string;
};

type UpdateUserInput = {
    _id: string;
    data: {
        email?: string;
        firstName?: string;
        lastName?: string;
        role?: UserRole;
    };
};

const getUserByEmail = async (
    email: string
): Promise<UserResultWithPassword | undefined> => {
    const doc = await users.findOne({ email }, { __v: 0 });
    if (!doc) {
        return;
    }

    return doc;
};

const registerUser = async (
    args: CreateUserInput
): Promise<IUserResult | undefined> => {
    const { password, ...data } = args;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const doc = await users.create({ ...data, password: hash });
    return { ...data, _id: doc._id };
};

const updateUser = async (
    args: UpdateUserInput
): Promise<IUserResult | undefined> => {
    const { _id, data } = args;
    const doc = await users
        .findOneAndUpdate(
            { _id },
            { ...data },
            { new: true, select: "-password" }
        )
        .catch((error) => {
            console.error(error);
            return;
        });
    if (!doc) {
        return;
    }

    return doc;
};

export { getUserByEmail, registerUser, updateUser, UserRole };

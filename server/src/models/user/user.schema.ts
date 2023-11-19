import mongoose, { Document, Schema } from "mongoose";
import { UserRole } from "./user.model";

interface IUser extends Document {
    email: string;
    password: string;
    role: UserRole;
    firstName: string;
    lastName: string;
}

const schema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    { versionKey: false }
);

export default mongoose.model<IUser>("User", schema);

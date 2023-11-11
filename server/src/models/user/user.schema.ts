import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    passwordHash: string;
    passwordSalt: string;
}

const schema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    passwordSalt: {
        type: String,
        required: true,
    },
});

export default mongoose.model<IUser>("User", schema);

import { redisConnect } from "../config/redis";

type Session = {
    id: string;
    role: "admin" | "user";
};

const getSession = async (sessionId: string): Promise<undefined> => {
    const client = await redisConnect();

    const session = await client.get(sessionId);
    if (!session) {
        return;
    }

    client.disconnect();
};

const saveSession = async (sessionId: string) => {
    const client = await redisConnect();

    client.disconnect();
};

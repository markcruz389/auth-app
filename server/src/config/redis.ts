import { createClient } from "redis";

const REDIS_URL = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

const redisConnect = async () => {
    const client = await createClient({ url: REDIS_URL })
        .on("error", (error) => console.log("Redis client error", error))
        .connect();

    return client;
};

export { redisConnect };

import http from "node:http";

import app from "./app";
import { redis } from "./config/redis";
import { mongoConnect } from "./config/mongo";

const PORT = process.env.SERVER_PORT;

const startServer = async () => {
    await mongoConnect();
    redis.set("test", "test");

    const server = http.createServer(app);

    server.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
};

startServer();

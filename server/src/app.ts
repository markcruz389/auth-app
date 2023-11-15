import path from "node:path";
import express from "express";
import api from "./routes/v1";
import { redis } from "./config/redis";

const app = express();

app.use(express.json());

// app.use("/", express.static(path.join(__dirname, "..", "public")));

app.get("/", async (req, res) => {
    const value = await redis.get("test");

    return res.send(`<h1>${value}</h1>`);
});

app.use("/api/v1", api);

export default app;

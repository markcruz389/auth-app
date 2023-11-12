import path from "node:path";
import express from "express";
import api from "./routes/v1";

const app = express();

app.use(express.json());

// app.use("/", express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
    return res.send("<h1>tsest!ssssssxs!!sbbb##s454</h1>");
});

app.use("/api/v1", api);

export default app;

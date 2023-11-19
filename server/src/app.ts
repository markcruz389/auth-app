import express from "express";

import api from "./routes/v1";

import errorHandler, { CustomError } from "./middlewares/errorHandler";
import expressSession from "./services/session";

const app = express();

app.use(express.json());

app.use(expressSession);

app.use("/api/v1", api);

app.use("*", (req, _, next) => {
    const error = new CustomError(404, `${req.baseUrl} not found`);
    next(error);
});

app.use(errorHandler);

export default app;

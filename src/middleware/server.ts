import express, { Express } from "express";
import cors from "cors";
import config from "config";

export const serverMiddleware = (app: Express) => {
    app.use(cors({
        origin: config.get("clientOrigin"),
        optionsSuccessStatus: 200,
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};
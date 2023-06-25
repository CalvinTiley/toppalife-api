import express from "express";
import { healthCheckerRouter } from "./healthChecker.router";

export const apiRouter = express.Router();

apiRouter.use("/healthchecker", healthCheckerRouter);
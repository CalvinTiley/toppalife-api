import express from "express";
import { healthCheckerRouter } from "./healthChecker.router";
import { usersRouter } from "./users.router";

export const apiRouter = express.Router();

apiRouter.use("/healthchecker", healthCheckerRouter);
apiRouter.use("/users", usersRouter);
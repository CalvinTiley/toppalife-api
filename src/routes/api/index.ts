import express from "express";
import { healthCheckerRouter } from "./healthChecker.router";
import { usersRouter } from "./users.router";
import { authRouter } from "./auth.router";

export const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/healthchecker", healthCheckerRouter);
apiRouter.use("/users", usersRouter);
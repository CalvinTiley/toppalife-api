import express from "express";
import { usersController } from "../../controllers";

export const usersRouter = express.Router();

usersRouter.post("/", usersController.POST);
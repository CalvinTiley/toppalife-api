import express from "express";
import redisClient from "../../utils/connectRedis";

export const healthCheckerRouter = express.Router();

healthCheckerRouter.get("/", async (request, response, next) => {
    const message = await redisClient.get("try");

    response.status(200).json({
        status: "success",
        message,
    });

    next();
});
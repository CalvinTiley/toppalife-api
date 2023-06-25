require("dotenv").config();
import express from "express";
import config from "config";
import validateEnv from "./utils/validateEnv";
import { PrismaClient } from "@prisma/client";
import { apiRouter } from "./routes/api";
import { serverLogger } from "./utils/logger";
import { serverMiddleware } from "./routes/middleware/server.middleware";

validateEnv();

const prisma = new PrismaClient();
const app = express();

async function main() {
    const port = config.get<number>("port");

    // Configuration
    serverMiddleware(app);

    // Routes
    app.use("/api", apiRouter);

    app.listen(port, () => {
        serverLogger.log({
            message: `Server is running on port: ${port}`,
            level: "info",
        });
    });
}

main()
    .catch((err) => {
        throw err;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

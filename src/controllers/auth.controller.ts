import { Request, Response } from "express";
import { comparePasswords } from "../utils/encrypt";
import { authService, userService } from "../services";
import { usersSchemas } from "../schemas";
import { signJwt, verifyJwt } from "../utils/jwt";
import { findUser } from "../services/user.service";
import { User } from "../types/User";
import { serverLogger } from "../utils/logger";

export const Login = async (request: Request, response: Response) => {
    const validatedData = usersSchemas.login.validate(request.body);

    if (validatedData.error) {
        return response.status(400).json({
            errors: validatedData.error.details,
        });
    }

    try {
        const user = await userService.findUser({ email: request.body.email });

        if (!comparePasswords(request.body.password, user.password)) {
            return response.status(400).json({
                errors: [{
                    messages: "Invalid email or password.",
                }],
            });
        }

        const accessToken = signJwt(user, "jwtSecret");
        const refreshToken = signJwt(user, "jwtRefreshSecret");

        await authService.deleteRefreshToken(user);
        await authService.createRefreshToken(refreshToken, user);

        return response.status(200).json({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
    } catch (error) {
        return response.status(400).json({
            errors: [{
                messages: "There was an issue logging in.",
            }],
        });
    }
};

export const RefreshAccessToken = async (request: Request, response: Response) => {
    if (!request.body.refresh_token) {
        return response.status(400).json({
            message: "No refresh token was sent in the request.",
        });
    }

    try {
        const decodedRefreshToken = verifyJwt<User>(request.body.refresh_token, "jwtRefreshSecret");

        if (!decodedRefreshToken) {
            return response.status(400).json({
                message: "Could not verify refresh token.",
            });
        }

        const user = await findUser({ id: decodedRefreshToken.id });
        const accessToken = signJwt(user, "jwtSecret");

        return response.status(200).json({ accessToken });
    } catch (error) {
        serverLogger.log({
            message: `Error refreshing token: ${error}`,
            level: "error",
        });

        return response.status(500).json({
            message: "Server encountered an error.",
        });
    }
};

export const ValidateAccessToken = async (request: Request, response: Response) => {
    if (!request.body.access_token) {
        return response.status(400).json({
            message: "No access token was sent in the request.",
        });
    }

    try {
        const verifiedAccessToken = verifyJwt<User>(request.body.access_token, "jwtSecret");

        if (!verifiedAccessToken) {
            return response.status(400).json({
                message: "Access token is invalid.",
            });
        }

        return response.status(200).json({
            message: "Access token is valid",
            data: {
                access_token: request.body.access_token,
            },
        });
    } catch (error) {
        serverLogger.log({
            message: `Error verifying access token: ${error}`,
            level: "error",
        });

        return response.status(403).json({
            message: "Server encountered an error.",
        });
    }
};
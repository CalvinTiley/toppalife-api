import { Request, Response } from "express";
import { usersSchemas } from "../schemas";
import { User, UserRegistrationResponseData } from "../types/User";
import { encryptPassword } from "../utils/encrypt";
import { authService, userService } from "../services";
import { signJwt } from "../utils/jwt";

export const Register = async (request: Request, response: Response) => {
    const validatedData = usersSchemas.register.validate(request.body);

    if (validatedData.error) {
        response.status(400).json({
            errors: validatedData.error.details,
        });

        return;
    }

    const userData: UserRegistrationResponseData = {
        email: request.body.email.toLowerCase(),
        name: request.body.name,
        password: await encryptPassword(request.body.password),
    };

    try {
        const user: User = await userService.createUser(userData);

        const accessToken = signJwt(user, "jwtSecret");
        const refreshToken = signJwt(user, "jwtRefreshSecret", { expiresIn: 30 });

        authService.createRefreshToken(refreshToken, user);

        const responseData = {
            email: user.email,
            name: user.name,
            photo: user.photo,
            access_token: accessToken,
            refresh_token: refreshToken,
        };

        response.status(201).json(responseData);
    } catch (error) {
        response.status(500).json({
            errors: [{
                message: "An error occurred on the server",
            }],
        });
    }
};
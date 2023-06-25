import { Request, Response } from "express";
import { comparePasswords } from "../utils/encrypt";
import { userService } from "../services";
import { usersSchemas } from "../schemas";
import { signJwt } from "../utils/jwt";

export const Login = async (request: Request, response: Response) => {
    const { body: data } = request;

    const validatedData = usersSchemas.login.validate(data);

    if (validatedData.error) {
        response.status(400).json({
            errors: validatedData.error.details,
        });

        return;
    }

    try {
        const user = await userService.findUser({ email: data.email });

        if (!comparePasswords(data.password, user.password)) {
            response.status(400).json({
                errors: [{
                    messages: "There was an issue logging in.",
                }],
            });
        }

        const token = signJwt(user, "jwtSecret");
        const refreshToken = signJwt(user, "jwtRefreshSecret", { expiresIn: 30 });

        response.status(200).json({
            token,
            refreshToken,
        });
    } catch (error) {
        response.status(400).json({
            errors: [{
                messages: "There was an issue logging in.",
            }],
        });
    }
};
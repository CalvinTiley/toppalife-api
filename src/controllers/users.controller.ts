import { Request, Response } from "express";
import { usersSchemas } from "../schemas";
import { User, UserRegistrationResponseData } from "../types/User";
import { encryptPassword } from "../utils/encrypt";
import { userService } from "../services";

export const Register = async (request: Request, response: Response) => {
    const { body: data } = request;

    const validatedData = usersSchemas.register.validate(data);

    if (validatedData.error) {
        response.status(400).json({
            errors: validatedData.error.details,
        });

        return;
    }

    const dataToSend: UserRegistrationResponseData = {
        email: data.email,
        name: data.name,
        password: await encryptPassword(data.password),
    };

    try {
        const newUser: User = await userService.createUser(dataToSend);

        response.status(201).json(newUser);
    } catch (error) {
        response.status(500).json({
            errors: [{
                message: "An error occurred on the server",
            }],
        });
    }
};
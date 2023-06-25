import { Request, Response } from "express";
import { usersSchemas } from "../schemas";

export const POST = (request: Request, response: Response) => {
    const { body: data } = request;

    const validatedResponse = usersSchemas.create.validate(data);

    if (validatedResponse.error) {
        response.status(400).json({
            errors: validatedResponse.error.details,
        });

        return;
    }

    response.status(200).json(data);
};
import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";

export const signJwt = (
    payload: Object,
    keyName: "jwtSecret" | "jwtRefreshSecret",
    options: SignOptions = {
        expiresIn: 10,
    },
) => {
    const privateKey = Buffer.from(
        config.get<string>(keyName),
        "base64",
    ).toString("ascii");

    return jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: "HS256",
    });
};

export const verifyJwt = <T>(
    token: string,
    keyName: "jwtSecret" | "jwtRefreshSecret"
): T | null => {
    try {
        const publicKey = Buffer.from(
            config.get<string>(keyName),
            "base64"
        ).toString("ascii");

        const decoded = jwt.verify(token, publicKey) as T;

        return decoded;
    } catch (error) {
        return null;
    }
};
import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";

const accessTokenLife = 600;
const refreshTokenLife = 21600;

export const signJwt = (
    payload: Object,
    keyName: "jwtSecret" | "jwtRefreshSecret",
    options?: SignOptions,
) => {
    const privateKey = Buffer.from(
        config.get<string>(keyName),
        "base64",
    ).toString("ascii");

    return jwt.sign(payload, privateKey, {
        algorithm: "HS256",
        expiresIn: keyName === "jwtSecret" ? accessTokenLife : refreshTokenLife,
        ...(options && options),
    });
};

export const verifyJwt = <T>(
    token: string,
    keyName: "jwtSecret" | "jwtRefreshSecret",
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
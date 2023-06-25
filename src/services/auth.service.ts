import { User } from "../types/User";
import { db } from "../utils/db";

export const createRefreshToken = async (refreshToken: string, user: User) => {
    const dto = {
        hashedToken: refreshToken,
        userId: user.id,
    };

    return (await db.refreshToken.create({ data: dto })) as unknown as User;
};

export const deleteRefreshToken = async ({ id }: User) => {
    await db.refreshToken.deleteMany({
        where: {
            userId: id
        }
    });
};
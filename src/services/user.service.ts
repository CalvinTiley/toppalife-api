import { db } from "../utils/db";
import type { Prisma } from "@prisma/client";
import type { User, UserRegistrationResponseData } from "../types/User";

export const createUser = async (data: UserRegistrationResponseData) => {
    return (await db.user.create({ data })) as unknown as User;
};

export const findUser = async (
    where: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect,
) => (
    (await db.user.findUnique({
        where,
        select,
    })) as unknown as User
);
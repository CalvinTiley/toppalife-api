import bcrypt from "bcrypt";

const saltRounds = 12;

export const encryptPassword = (password: string) => bcrypt.hash(password, saltRounds);

export const comparePasswords = (plainPassword: string, hashedPassword: string) => (
    bcrypt.compare(plainPassword, hashedPassword)
);
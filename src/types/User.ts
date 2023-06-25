export interface UserRegistrationResponseData {
    email: string;
    name: string;
    password: string;
}

export interface User {
    createdAt: string;
    email: string;
    id: string;
    name: string;
    password: string;
    photo: string;
    updatedAt: string;
}
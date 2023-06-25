export interface UserRegistrationResponseData {
    access_token?: string;
    email: string;
    name: string;
    password: string;
    refresh_token?: string;
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
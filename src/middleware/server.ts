import express, { Express } from "express";

export const serverMiddleware = (app: Express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../domain/dtos/errors/errors";
import { getAuth } from "@clerk/express";

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Placeholder for authentication logic
    // In a real application, you would verify tokens or session data here
    const auth = getAuth(req);
    if (!auth.userId) {
        throw new UnauthorizedError("User is not authenticated");
    }
    console.log("Authentication Info:", auth);
    next();

};
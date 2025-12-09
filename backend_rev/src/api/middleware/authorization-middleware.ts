import { Request, Response, NextFunction } from 'express';
import { getAuth} from "@clerk/express";
import { ForbidenError, UnauthorizedError } from '../../domain/dtos/errors/errors';
import { UserPublicMetadata } from '../../domain/dtos/types';

export const authorizaztionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Placeholder for authorization logic
    // In a real application, you would check user roles or permissions here
    const auth = getAuth(req);
    if(!auth.userId) {
        throw new UnauthorizedError("User is not authenticated");
    }
    const publicMetaData = auth.sessionClaims?.metadata as UserPublicMetadata;
    if (publicMetaData.role !== 'admin') {
        throw new ForbidenError("User does not have the required permissions");
    }
    next();
}
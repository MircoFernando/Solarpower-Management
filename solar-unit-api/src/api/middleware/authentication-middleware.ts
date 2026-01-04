import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../domain/errors';

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const providedSecret = req.headers['x-internal-secret'];
    const validSecret = process.env.INTERNAL_API_KEY;

  if (!providedSecret || providedSecret !== validSecret) {
    throw new UnauthorizedError("Sender is not authenticated");
  }

  next(); 
};
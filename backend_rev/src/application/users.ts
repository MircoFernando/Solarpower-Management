import {get} from 'http';
import { NotFoundError, ValidationError } from "../domain/dtos/errors/errors";
import { User } from '../infastructure/entities/user';
import { Request, Response, NextFunction } from 'express';


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = await User.find();
        res.status(200).json(user);
    }
    catch (error: any) {
        next(error); // Pass the error to the global error handler
    }
};
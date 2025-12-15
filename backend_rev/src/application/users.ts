import {get} from 'http';
import { NotFoundError, ValidationError } from "../domain/dtos/errors/errors";
import { User } from '../infastructure/entities/user';
import { RegisteredUser } from '../infastructure/entities/registeredUsers';
import { CreateRegisteredUserDto } from '../domain/dtos/registeredUsers';
import { Request, Response, NextFunction } from 'express';
import {z} from 'zod';


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = await User.find();
        res.status(200).json(user);
    }
    catch (error: any) {
        next(error); // Pass the error to the global error handler
    }
};

export const getAllRegisteredUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = await RegisteredUser.find();
        res.status(200).json(user);
    }
    catch (error: any) {
        next(error); // Pass the error to the global error handler
    }
};
export const CreateRegisteredUserValidator = (req: Request, res: Response, next: NextFunction) => {
    const result = CreateRegisteredUserDto.safeParse(req.body);
    if (!result.success) {
        throw new ValidationError(result.error.message);
    }
    next();
};

export const CreateRegisteredUser = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
    // ✅ Validate request body
    const data: z.infer<typeof CreateRegisteredUserDto> =
      CreateRegisteredUserDto.parse(req.body);


    const registeredUser = await RegisteredUser.create({
      userName: data.userName,
      clerkUserId: data.clerkUserId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      propertyType: data.propertyType,
      roofType: data.roofType,
      avgConsumption: data.avgConsumption,
      systemType: data.systemType,
      timeline: data.timeline,
      budget: data.budget,
      financing: data.financing,


      status: "pending",
    });

    res.status(201).json({
      message: "Solar unit application submitted successfully",
      data: registeredUser,
    });
  } catch (error) {
    next(error);
  }
};
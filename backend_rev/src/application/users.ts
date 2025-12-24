import {get} from 'http';
import { NotFoundError, ValidationError } from "../domain/dtos/errors/errors";
import { User } from '../infastructure/entities/user';
import { RegisteredUser } from '../infastructure/entities/registeredUsers';
import { CreateRegisteredUserDto, UpdateRegisteredUserDto } from '../domain/dtos/registeredUsers';
import { Request, Response, NextFunction } from 'express';
import { getAuth } from "@clerk/express";
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
export const getAllRegisteredUsersByClerkUserId = async (req: Request, res: Response, next: NextFunction) => {
  try{
     const auth = getAuth(req);
      console.log("Authentication info:", auth);
      const clerkUserid = auth.userId;
      console.log("Clerk UserID:", clerkUserid);
      const user = await RegisteredUser.findOne({ clerkUserId: clerkUserid });
      console.log("User:", user?._id);

      if (!user) {
        console.log("User has not registered");
                  return res.status(200).json({message: "User has not applied"});
                  
              }
      return res.status(200).json(user);
        
    }
        catch (error: any) {
        next(error); // Pass the error to the global error handler
    }
  }




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
      country: data.country,
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

export const updateRegisteredUserByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {id} = req.params;
    const data: z.infer<typeof UpdateRegisteredUserDto> =
      UpdateRegisteredUserDto.parse(req.body);
    const User = await RegisteredUser.findById(id);

    if(!User) {
      throw new NotFoundError("User not found");
    }

    const updatedUser = await RegisteredUser.findByIdAndUpdate(id, data, {new: true});

    res.status(200).json(updatedUser);
  }
  catch(error: any) {
    next(error);
  }
}
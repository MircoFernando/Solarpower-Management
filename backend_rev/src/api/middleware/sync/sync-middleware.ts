import { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { User } from "../../../infastructure/entities/user";
import { NotFoundError } from "../../../domain/dtos/errors/errors";
import { SolarUnit } from "../../../infastructure/entities/solarUnit";

export const syncMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    const auth = getAuth(req);
    console.log(auth);

    const user = await User.findOne({ clerkUserId: auth.userId});
    if(!user){
        throw new NotFoundError("User Not Found");
    }
    const solarUnit = await SolarUnit.findOne({ userId: user._id});
    if(!solarUnit){
        throw new NotFoundError("Solarunit Not Found");
    }

    // Call the solarunit data service to fetch the energygeneration records for the unit
    next();

};

export default syncMiddleware;
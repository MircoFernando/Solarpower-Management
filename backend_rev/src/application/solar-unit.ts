import { get } from "http";
import { NotFoundError, ValidationError } from "../domain/dtos/errors/errors";
import {
  CreateSolarUnitDto,
  idDto,
  UpdateSolarUnitDto,
} from "../domain/dtos/solar-unit";
// Or, if the file does not exist, create '../domain/dtos/solar-unit.ts' and export CreateSolarUnitDto from it.
import { SolarUnit } from "../infastructure/entities/solarUnit";
import { User } from "../infastructure/entities/user";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { getAuth } from "@clerk/express";
import { RegisteredUser } from "../infastructure/entities/registeredUsers";
import axios from "axios";

export const getAllSolarUnits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const solarUnits = await SolarUnit.find();
    res.status(200).json(solarUnits);
  } catch (error: any) {
    next(error); // Pass the error to the global error handler
  }
};
export const createSolarUnitValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = CreateSolarUnitDto.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError(result.error.message);
  }
  next();
};
export const createSolarUnit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: z.infer<typeof CreateSolarUnitDto> = req.body;

    const newSolarUnit = {
      userID: data.userId,
      capacity: data.capacity,
      serial_number: data.serial_number,
      installation_date: new Date(data.installation_date),
      status: data.status,
    };
    const createdSolarUnit = await SolarUnit.create(newSolarUnit);
    

     if (newSolarUnit.status === 'active') {
      try {
        const dataServiceUrl = 'https://solarpower-management-solarunit-api.onrender.com';
        
        await axios.post(
          `${dataServiceUrl}/api/energy-generation-records/solar-unit/new-unit`,
          {
            serialNumber: newSolarUnit.serial_number,
            status: newSolarUnit.status,
          },
          {
            headers: {
              'x-service-secret': process.env.INTERNAL_API_KEY
            }
          }
        );

        console.log(`Solar unit ${newSolarUnit.serial_number} registered with data service`);
      } catch (dataServiceError) {
        console.error('Failed to register with data service:', dataServiceError);
      }
    }
    res.status(200).json(createdSolarUnit);
  } catch (error: any) {
    next(error); // Pass the error to the global error handler
  }
};

export const getSolarUnitUserByClerkUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = getAuth(req);
    console.log("Authentication info:", auth);
    const clerkUserid = auth.userId;
    console.log("Clerk UserID:", clerkUserid);
    const user = await RegisteredUser.findOne({ clerkUserId: clerkUserid });
    console.log("User:", user?._id);
    if (!user) {
      console.log("No user found, redirecting to registration");
    }

    const solarUnit = await SolarUnit.find({ userID: user?._id });
    console.log("Solar Unit:", solarUnit);

    if (!solarUnit) {
      throw new NotFoundError("Solarunit not found");
    }
    res.status(200).json(solarUnit[0]);
  } catch (error: any) {
    next(error); // Pass the error to the global error handler
  }
};
// GET USERS WHO ARE NOT ASSIGNED A SOLAR UNIT
export const getNewSolarUnitUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const solarUnits = await SolarUnit.find({}, "userID");
    const assignedUserIds = solarUnits.map((unit) => unit.userID);

    const newUsers = await User.find({
      _id: { $nin: assignedUserIds }, 
    });

    return res.status(200).json(newUsers);
  } catch (error) {
    next(error);
  }
};

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = idDto.safeParse(req.params);
  if (!result.success) {
    throw new ValidationError(result.error.message);
  }

  // attach parsed data back to req for type safety
  req.params = result.data;
  next();
};

export const getSolarUnitById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const solarUnit = await SolarUnit.findById(id);
    if (!solarUnit) {
      throw new NotFoundError("Solarunit not found");
    }
    res.status(200).json(solarUnit);
  } catch (error: any) {
    next(error); // Pass the error to the global error handler
  }
};

export const updateSolarUnitById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data: z.infer<typeof UpdateSolarUnitDto> = req.body;
    const solarUnit = await SolarUnit.findById(id);

    if (!solarUnit) {
      throw new NotFoundError("Solarunit not found");
    }

    const updatedSolarUnit = await SolarUnit.findByIdAndUpdate(
      id,
      {
        capacity: data.capacity,
        serial_number: data.serial_number,
        installation_date: new Date(data.installation_date),
        status: data.status,
      },
      { new: true }
    );

    res.status(200).json(updatedSolarUnit);
  } catch (error: any) {
    next(error); // Pass the error to the global error handler
  }
};

export const deleteSolarUnitById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const solarUnit = await SolarUnit.findById(id);

    if (!solarUnit) {
      throw new NotFoundError("Solarunit not found");
    }

    await SolarUnit.findByIdAndDelete(id);
    res.status(200).json({ message: "Solar unit deleted successfully" });
  } catch (error: any) {
    next(error); // Pass the error to the global error handler
  }
};

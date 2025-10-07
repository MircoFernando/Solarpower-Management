import { NotFoundError, ValidationError } from "../domain/dtos/errors/errors";
import { CreateSolarUnitDto, idDto, UpdateSolarUnitDto} from "../domain/dtos/solar-unit";
// Or, if the file does not exist, create '../domain/dtos/solar-unit.ts' and export CreateSolarUnitDto from it.
import { SolarUnit } from '../infastructure/entities/solarUnit';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const getAllSolarUnits = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const solarUnits = await SolarUnit.find();
        res.status(200).json(solarUnits);
    } 
    catch (error: any) {
       next(error); // Pass the error to the global error handler
    }
};
export const createSolarUnitValidator = (req: Request, res: Response, next: NextFunction) => {
    const result = CreateSolarUnitDto.safeParse(req.body);
    if (!result.success) {
        throw new ValidationError(result.error.message);
    }
    next();
};
export const createSolarUnit = async (req: Request, res: Response, next: NextFunction) => {
    
    try { 
    
    // TODO: Implement taking userID via actual handlers with protect
    const data:z.infer<typeof CreateSolarUnitDto> = req.body;

    const newSolarUnit = {
        userID: data.userId,
        capacity: data.capacity,
        serial_number: data.serial_number,
        installation_date: new Date(data.installation_date),
        status: data.status
    };

    
        const createdSolarUnit = await SolarUnit.create(newSolarUnit);
        res.status(200).json(createdSolarUnit);
    }
    catch (error: any) {
        next(error); // Pass the error to the global error handler
    }
};

export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
  const result = idDto.safeParse(req.params);
  if (!result.success) {
    throw new ValidationError(result.error.message);
  }

  // attach parsed data back to req for type safety
  req.params = result.data;
  next();
};

export const getSolarUnitById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const solarUnit = await SolarUnit.findById(id);
        if (!solarUnit) {
            throw new NotFoundError("Solarunit not found");
        }
        res.status(200).json(solarUnit);
    }
    catch (error: any) {
        next(error); // Pass the error to the global error handler
    }
};


export const updateSolarUnitById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data:z.infer<typeof UpdateSolarUnitDto> = req.body;
        const solarUnit = await SolarUnit.findById(id);

        if (!solarUnit) {
            throw new NotFoundError("Solarunit not found");
        }

        const updatedSolarUnit = await SolarUnit.findByIdAndUpdate(id, {
            capacity: data.capacity,
            serial_number: data.serial_number,
            installation_date: new Date(data.installation_date),
            status: data.status
        }, { new: true });

        res.status(200).json(updatedSolarUnit);
    }
    catch (error: any) {
        next(error); // Pass the error to the global error handler
    }
};

export const deleteSolarUnitById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const solarUnit = await SolarUnit.findById(id);

        if (!solarUnit) {
            throw new NotFoundError("Solarunit not found");
        }

        await SolarUnit.findByIdAndDelete(id);
        res.status(200).json({ message: "Solar unit deleted successfully" });
    }
    catch (error: any) {
       next(error); // Pass the error to the global error handler   
    }
};
import { EnergyGenerationRecord } from "../infastructure/entities/EnergyGenerationRecord";
import { NotFoundError, ValidationError } from "../domain/dtos/errors/errors";
import { Request, Response, NextFunction } from 'express';
import { idDto } from "../domain/dtos/energy-generation-record";
import mongoose from "mongoose";
import { SolarUnit } from "../infastructure/entities/solarUnit";


export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
  const result = idDto.safeParse(req.params);
  if (!result.success) {
    throw new ValidationError(result.error.message);
  }

  // attach parsed data back to req for type safety
  req.params = result.data;
  next();
};

export const getEnergyRecordsBySolarUnitId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // <-- matches :id in route

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid solar unit ID format" });
    }

    const records = await EnergyGenerationRecord.find({ solarUnit: id });

    if (!records || records.length === 0) {
      return res.status(404).json({ message: "No energy generation records found for this solar unit" });
    }

    res.status(200).json(records);
  } catch (error: any) {
    next(error);
  }
};


export const getallEnergyRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const records = await EnergyGenerationRecord.find();
        if (!records) {
            return res.status(404).json({ message: "No energy generation records found" });
        }
        res.status(200).json(records);
    }
    catch (error: any) {
        next(error); // Pass the error to the global error handler
    }
};

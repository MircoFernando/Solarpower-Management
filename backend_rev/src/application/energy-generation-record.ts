import { EnergyGenerationRecord } from "../infastructure/entities/EnergyGenerationRecord";
import { NotFoundError, ValidationError } from "../domain/dtos/errors/errors";
import { Request, Response, NextFunction } from 'express';
import { idDto } from "../domain/dtos/energy-generation-record";
import mongoose from "mongoose";


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
        const { solarUnit } = req.params;
        const record = await EnergyGenerationRecord.find({solarUnit: solarUnit});
        if (!record) {
      return res.status(404).json({ message: "No energy generation records found for this solar unit" });
        }
        res.status(200).json(record);
    }
    catch (error: any) {
        next(error); // Pass the error to the global error handler
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

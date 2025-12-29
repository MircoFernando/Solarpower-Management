import { EnergyGenerationRecord } from "../infastructure/entities/EnergyGenerationRecord";
import { NotFoundError, ValidationError } from "../domain/dtos/errors/errors";
import { Request, Response, NextFunction } from "express";
import {
  idDto,
  getallEnergyRecordsDto,
} from "../domain/dtos/energy-generation-record";
import mongoose from "mongoose";
import { SolarUnit } from "../infastructure/entities/solarUnit";
import { timeStamp } from "console";
import { format } from "path";

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

export const getEnergyRecordsBySolarUnitId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; // <-- matches :id in route
    const results = getallEnergyRecordsDto.safeParse(req.query);
    if (!results.success) {
      throw new ValidationError(results.error.message);
    }

    const { groupBy, limit } = results.data;

    if (!groupBy) {
      const records = await EnergyGenerationRecord.find({ solarUnit: id }).sort(
        { timestamp: -1 }
      ); // Sort by timestamp ascending

      if (!records || records.length === 0) {
        return res
          .status(404)
          .json({
            message: "No energy generation records found for this solar unit",
          });
      }

      res.status(200).json(records);
    }
    if (groupBy === "date") {
      const records = await EnergyGenerationRecord.aggregate([
        {
          $match: {
            solarUnit: new mongoose.Types.ObjectId(id),
          },
        },
         {
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$timestamp",
                },
              },
            },
            totalEnergy: { $sum: "$energyGenerated" },
          },
        },
        {
          $sort: { "_id.date": -1 },
        },
      ]);

      if (!limit) {
        return res.status(200).json(records);
      }

      return res.status(200).json(records.slice(0, parseInt(limit)));
    }
  } catch (error: any) {
    next(error);
  }
};

export const getallEnergyRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const records = await EnergyGenerationRecord.find();
    if (!records) {
      return res
        .status(404)
        .json({ message: "No energy generation records found" });
    }
    res.status(200).json(records);
  } catch (error: any) {
    next(error); // Pass the error to the global error handler
  }
};

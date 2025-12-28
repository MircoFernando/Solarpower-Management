import { NextFunction, Request, Response } from "express";
import { EnergyGenerationRecord } from "./../infastructure/entities/EnergyGenerationRecord";
import { SolarUnit } from "../infastructure/entities/solarUnits";
import { generateNewRecord }from "./../infastructure/energy-generation-cron"

export const getAllEnergyGenerationRecordsBySerialNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { serialNumber } = req.params;
    const { sinceTimestamp } = req.query;

    const filter: {serialNumber: string, timestamp?: { $gt: Date }} = { serialNumber };
    if (sinceTimestamp && typeof sinceTimestamp === "string") {
      filter.timestamp = { $gt: new Date(sinceTimestamp) };
    }

    const energyGenerationRecords = await EnergyGenerationRecord.find(filter).sort({ timestamp: 1 });
    res.status(200).json(energyGenerationRecords);
  } catch (error) {
    next(error);
  }
};

export const SolarUnitRegistry = async  (req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const { serialNumber, status} = req.body;

    if (!serialNumber) {
      return res.status(400).json({ error: 'serialNumber is required' });
    }

    // Check if already registered
    const existingUnit = await SolarUnit.findOne({ serialNumber });
    if (existingUnit) {
      return res.status(400).json({ 
        error: 'Solar unit already registered',
        existingUnit 
      });
    }

    // Create solar unit in data service database
    const newSolarUnit = await SolarUnit.create({
      serialNumber,
      status: status || 'active',
    });

    console.log(`Solar unit ${serialNumber} registered in database`);



    res.status(200).json({
      message: 'Solar unit registered successfully',
      solarUnit: newSolarUnit,
    });
  } catch (error: any) {
    console.error('Error in SolarUnitRegistry:', error);
    next(error);
  }
};
import { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { NotFoundError } from "../../../domain/dtos/errors/errors";
import { SolarUnit } from "../../../infastructure/entities/solarUnit";
import { EnergyGenerationRecord } from "../../../infastructure/entities/EnergyGenerationRecord";

import { z } from "zod";
import { RegisteredUser } from "../../../infastructure/entities/registeredUsers";

export const DataAPIEnergyGenerationRecordDto = z.object({
  _id: z.string(),
  serialNumber: z.string(),
  energyGenerated: z.number(),
  timestamp: z.string(),
  intervalHours: z.number(),
  __v: z.number(),
});

/**
 * Synchronizes energy generation records from the data API
 * Fetches latest records and merges new data with existing records
 */
export const syncMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = getAuth(req);
    const user = await RegisteredUser.findOne({ clerkUserId: auth.userId });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    console.log("User ", user);
    

    const solarUnit = await SolarUnit.findOne({ userID: user._id });
    if (!solarUnit) {
      console.log("No solar unit found, skipping sync");
      return next();
    }
    console.log("User ", solarUnit);

    // Fetch latest records from data API
    const dataAPIResponse = await fetch(
      `http://localhost:8000/api/energy-generation-records/solar-unit/${solarUnit.serial_number}`
    );
    if (!dataAPIResponse.ok) {
      throw new Error(
        "Failed to fetch energy generation records from data API"
      );
    }

    const latestEnergyGenerationRecords =
      DataAPIEnergyGenerationRecordDto.array().parse(
        await dataAPIResponse.json()
      );

    // Get latest synced timestamp to only fetch new data
    const lastSyncedRecord = await EnergyGenerationRecord.findOne({
      solarUnit: solarUnit._id,
    }).sort({ timestamp: -1 });

    console.log("Last data: ",lastSyncedRecord);
    

    // Filter records that are new (not yet in database)
    const newRecords = latestEnergyGenerationRecords.filter((apiRecord) => {
      if (!lastSyncedRecord) return true; // First sync, add all
      return new Date(apiRecord.timestamp) > lastSyncedRecord.timestamp;
    });

    if (newRecords.length > 0) {
      // Transform API records to match schema
      const recordsToInsert = newRecords.map((record) => ({
        solarUnit: solarUnit._id,
        energyGenerated: record.energyGenerated,
        timestamp: new Date(record.timestamp),
        intervalHours: record.intervalHours,
      }));

      await EnergyGenerationRecord.insertMany(recordsToInsert);
      console.log(
        `Synced ${recordsToInsert.length} new energy generation records`
      );
    } else {
      console.log("No new records to sync");
    }

    next();
  } catch (error) {
    console.error("Sync middleware error:", error);
    next(error);
  }
};

export default syncMiddleware;

 
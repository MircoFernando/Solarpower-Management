import { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { NotFoundError } from "../../../domain/dtos/errors/errors";
import { SolarUnit } from "../../../infastructure/entities/solarUnit";
import { EnergyGenerationRecord } from "../../../infastructure/entities/EnergyGenerationRecord";

import { z } from "zod";
import { RegisteredUser } from "../../../infastructure/entities/registeredUsers";
import mongoose from "mongoose";
import {
  ABNORMAL_PEAK,
  GENERATION_DROP,
  NIGHT_GENERATION,
  ZERO_GENERATION,
} from "../../../application/backgroundJob/anomaly/anomoly-detection";
import { log } from "console";

export const DataAPIEnergyGenerationRecordDto = z.object({
  _id: z.string(),
  serialNumber: z.string(),
  energyGenerated: z.number(),
  timestamp: z.string(),
  intervalHours: z.number(),
  __v: z.number(),
});

export interface RecordDto {
  solarUnit: mongoose.Types.ObjectId;
  energyGenerated: Number;
  timestamp: Date;
  intervalHours: Number;
}

export interface SolarUnitDto {
  _id: string;
  userID: mongoose.Types.ObjectId;
  capacity: Number;
  installation_date: Date;
  status: String;
}

/**
 * Synchronizes energy generation records from the data API
 * Fetches latest records and merges new data with existing records
 */

async function syncGenerationRecords(payload: RecordDto[]) {
  // Get latest synced timestamp to only fetch new data

  try {
    await EnergyGenerationRecord.insertMany(payload);
    console.log(`Synced ${payload.length} new energy generation records`);
  } catch (error) {
    console.error("Sync Generation records error:", error);
  }
}

// Sync Middleware for Syncing both Generation Records and Anomalies
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

    //Create Generation Records Sync and Anomaly Sync

    const latestEnergyGenerationRecords =
      DataAPIEnergyGenerationRecordDto.array().parse(
        await dataAPIResponse.json()
      );

    const lastSyncedRecord = await EnergyGenerationRecord.findOne({
      solarUnit: solarUnit._id,
    }).sort({ timestamp: -1 });

    console.log("Last data: ", lastSyncedRecord);

    // Filter records that are new (not yet in database)
    const newRecords = latestEnergyGenerationRecords.filter((apiRecord) => {
      if (!lastSyncedRecord) return true; // First sync, add all
      return new Date(apiRecord.timestamp) > lastSyncedRecord.timestamp;
    });

    if (newRecords.length > 0) {
      // Transform API records to match schema
      const recordsToInsert = newRecords.map((record) => ({
        solarUnit: solarUnit._id,
        serialNumber: solarUnit.serial_number,
        energyGenerated: record.energyGenerated,
        timestamp: new Date(record.timestamp),
        intervalHours: record.intervalHours,
        processedForAnomaly: false,
      }));

      await syncGenerationRecords(recordsToInsert);

    //   console.log("Processing for Anomaly Detection");
      

    //   const insertedRecords = await EnergyGenerationRecord.find({
    //     solarUnit: solarUnit._id,
    //   processedForAnomaly: false,
    //     });

    //   console.log("New Inserted: ", insertedRecords);
      
    // for (const record of insertedRecords) {
    //   console.log("Processing for Anomaly Detection", solarUnit._id);
    //   await ZERO_GENERATION(record);
    //   await GENERATION_DROP(record, solarUnit._id);
    //   await ABNORMAL_PEAK(record, solarUnit.capacity);
    //   await NIGHT_GENERATION(record);
    // }
  }
  else{
    console.log("No new generation Records to Sync and Detect Anomalies");
    
  }

    next();
  } catch (error) {
    console.error("Sync middleware error:", error);
    next(error);
  }
};
export default syncMiddleware;

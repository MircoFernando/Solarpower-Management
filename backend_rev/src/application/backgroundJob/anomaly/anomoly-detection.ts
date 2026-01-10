// Impelement the Anomlies detection functions here and add them to the scheduler function should not check all the records
//Each function should check anomlies for only the new energy records

import { record, z } from "zod";
import { EnergyGenerationRecord } from "./../../../infastructure/entities/EnergyGenerationRecord";
import { SolarUnit } from "./../../../infastructure/entities/solarUnit";
import { AnomalyRecords } from "../../../infastructure/entities/Anomolies";
import mongoose from "mongoose";
import { RegisteredUser } from "./../../../infastructure/entities/registeredUsers";
import { Request, Response, NextFunction } from "express";
import {
  NotFoundError,
  ValidationError,
} from "./../../../domain/dtos/errors/errors";

export const DataAPIEnergyGenerationRecordDto = z.object({
  _id: z.string(),
  serialNumber: z.string(),
  energyGenerated: z.number(),
  timestamp: z.string(),
  intervalHours: z.number(),
  __v: z.number(),
});

export interface RecordDto {
  _id: mongoose.Types.ObjectId;
  serialNumber: string;
  energyGenerated: number;
  timestamp: Date;
  intervalHours: number;
  __v: number;
}

export async function ZERO_GENERATION(payload: RecordDto) {
  const timestamp = new Date(payload.timestamp);
  const hour = timestamp.getUTCHours();

  if (hour < 6 || hour > 18) return;

  if (payload.energyGenerated < 1) {
    const anomalyRecords = {
      solarUnit_SN: payload.serialNumber,
      energyGenRecordId: payload._id,
      anomalyType: "ZERO_GENERATION",
      severity: "CRITICAL",
      detectedAt: payload.timestamp,
      description: "Solar Unit has not Generated Energy",
    };
    console.log(
      `🚨 CRITICAL: Zero generation anomaly detected for solar unit ${payload.serialNumber}`
    );
    await AnomalyRecords.create(anomalyRecords);
  }
}
export async function GENERATION_DROP(
  //fix generation drop anomaly to detect below the capacity level if night its ok if not then its a problem
  payload: RecordDto,
  solarUnitId: mongoose.Types.ObjectId
) {
  const timestamp = new Date(payload.timestamp);
  const sevenDaysAgo = new Date(timestamp.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneDayAgo = new Date(timestamp.getTime() - 24 * 60 * 60 * 1000);

  const historicalRecords = await EnergyGenerationRecord.find({
    solarUnit: solarUnitId,
    timestamp: { $gte: sevenDaysAgo, $lt: oneDayAgo },
  });

  if (historicalRecords.length < 10) return;

  const historicalAverage =
    historicalRecords.reduce((sum, r) => sum + r.energyGenerated, 0) /
    historicalRecords.length;

  // Get today's average
  const todayRecords = await EnergyGenerationRecord.find({
    solarUnit: solarUnitId,
    timestamp: { $gte: oneDayAgo },
  });

  if (todayRecords.length === 0) return;

  const todayAverage =
    todayRecords.reduce((sum, r) => sum + r.energyGenerated, 0) /
    todayRecords.length;
  const dropThreshold = 0.5;
  if (todayAverage < historicalAverage * dropThreshold) {
    const anomalyRecords = {
      solarUnit_SN: payload.serialNumber,
      energyGenRecordId: payload._id,
      anomalyType: "GENERATION_DROP",
      severity: "WARNING",
      detectedAt: payload.timestamp,
      description: "Solar Unit generated energy lower than Average",
    };
    console.log(
      `🚨 Warning: Generation Drop anomaly detected for solar unit ${payload.serialNumber}`
    );
    await AnomalyRecords.create(anomalyRecords);
  }
}

export async function ABNORMAL_PEAK(payload: RecordDto, capacity: number) {
  const timestamp = new Date(payload.timestamp);
  const serialNumber = payload.serialNumber;

  const threshold = capacity;

  if (payload.energyGenerated > threshold) {
    const anomalyRecords = {
      solarUnit_SN: payload.serialNumber,
      energyGenRecordId: payload._id,
      anomalyType: "ABNORMAL_PEAK",
      severity: "WARNING",
      detectedAt: payload.timestamp,
      description: "Solar Unit generated highly abnormal values",
    };
    console.log(
      `🚨 Warning: Abnomal Peak anomaly detected for solar unit ${payload.serialNumber}`
    );
    await AnomalyRecords.create(anomalyRecords);
  }
}
export async function NIGHT_GENERATION(payload: RecordDto) {
  const timestamp = new Date(payload.timestamp);
  const currentHour = timestamp.getUTCHours();

  const isNight = currentHour >= 19 || currentHour <= 5;

  if (!isNight) return;

  if (payload.energyGenerated > 0.5) {
    const anomalyRecords = {
      solarUnit_SN: payload.serialNumber,
      energyGenRecordId: payload._id,
      anomalyType: "NIGHT_GENERATION",
      severity: "WARNING",
      detectedAt: payload.timestamp,
      description: "Solar Unit generated in night time",
    };
    console.log(
      `🚨 Warning: Night Generation anomaly detected for solar unit ${payload.serialNumber}`
    );
    await AnomalyRecords.create(anomalyRecords);
  }
}
const breathe = () => new Promise(resolve => setImmediate(resolve));

export const AnomalyDetection = async () => {
  try {
    const solarUnits = await SolarUnit.find().lean(); // .lean() makes SolarUnits lighter

    for (const solarUnit of solarUnits) {
      
      let hasMoreRecords = true;
      let processedCount = 0;

      // PROCESS IN BATCHES (Pagination)
      // We keep fetching 50 records until none are left.
      // This ensures we never load 1700 records into RAM at once.
      while (hasMoreRecords) {
        
        // 1. Fetch only 50 records (Lightweight .lean() objects)
        const batch = await EnergyGenerationRecord.find({
          solarUnit: solarUnit._id,
          processedForAnomaly: false,
        })
          .sort({ timestamp: 1 })
          .limit(50) // <--- CRITICAL: Only load 50 into RAM
          .lean(); // <--- CRITICAL: Converts heavy Mongoose docs to simple JSON

        if (batch.length === 0) {
          hasMoreRecords = false;
          break;
        }

        // 2. Process the batch
        await Promise.all(
          batch.map((record) =>
            Promise.all([
              ZERO_GENERATION(record),
              GENERATION_DROP(record, solarUnit._id),
              ABNORMAL_PEAK(record, solarUnit.capacity),
              NIGHT_GENERATION(record),
            ])
          )
        );

        // 3. Mark batch as processed
        const batchIds = batch.map((r) => r._id);
        await EnergyGenerationRecord.updateMany(
          { _id: { $in: batchIds } },
          { $set: { processedForAnomaly: true } }
        );

        processedCount += batch.length;
        console.log(`Unit ${solarUnit.serial_number}: Processed ${processedCount} records...`);

        // 4. Breathe to let the CPU rest
        await breathe();
      }
    }
    console.log("Anomaly Detection Cycle Complete.");

  } catch (error) {
    console.error("Anomaly Job error:", error);
  }
};

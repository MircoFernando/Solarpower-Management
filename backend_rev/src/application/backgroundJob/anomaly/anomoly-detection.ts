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

  const threshold = capacity * 1.2;

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
    const solarUnits = await SolarUnit.find();

    for (const solarUnit of solarUnits) {
      // Get records that haven't been checked yet
      const newRecords = await EnergyGenerationRecord.find({
        solarUnit: solarUnit._id,
        processedForAnomaly: false,
      }).sort({ timestamp: 1 });

      if (newRecords.length > 0) {
        console.log(`Processing ${newRecords.length} records for unit ${solarUnit.serial_number}...`);

        // 2. Process in CHUNKS (Batching)
        // Instead of doing all 1000+ at once, we do 50 at a time.
        const CHUNK_SIZE = 50;
        
        for (let i = 0; i < newRecords.length; i += CHUNK_SIZE) {
          const chunk = newRecords.slice(i, i + CHUNK_SIZE);

          // Run checks for just this batch
          await Promise.all(
            chunk.map((record) =>
              Promise.all([
                ZERO_GENERATION(record),
                GENERATION_DROP(record, solarUnit._id),
                ABNORMAL_PEAK(record, solarUnit.capacity),
                NIGHT_GENERATION(record),
              ])
            )
          );

          // 3. Mark this specific batch as processed immediately
          // (This saves progress even if the app crashes later)
          const chunkIds = chunk.map((r) => r._id);
          await EnergyGenerationRecord.updateMany(
            { _id: { $in: chunkIds } },
            { $set: { processedForAnomaly: true } }
          );

          // 4. Breathe between batches
          // This creates a tiny pause so the CPU isn't 100% locked
          await breathe();
        }

      } else {
        // Optional: Commented out to reduce log noise
        // console.log("No new Energy Generation Records to Run Anomaly Detection");
      }

      // 5. Breathe between Solar Units as well
      await breathe();
    }
  } catch (error) {
    console.error("Anomaly Job error:", error);
  }
};

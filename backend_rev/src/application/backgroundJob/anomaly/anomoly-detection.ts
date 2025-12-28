
// Impelement the Anomlies detection functions here and add them to the scheduler function should not check all the records 
//Each function should check anomlies for only the new energy records
//TODO: Deploy before implemeting this.

import { z } from "zod";
import { EnergyGenerationRecord } from "./../../../infastructure/entities/EnergyGenerationRecord";
import { SolarUnit } from "./../../../infastructure/entities/solarUnit";
import { AnomalyRecords } from "../../../infastructure/entities/Anomolies";
import mongoose from "mongoose";
import { RegisteredUser } from "./../../../infastructure/entities/registeredUsers";
import { Request, Response, NextFunction } from "express";
import { NotFoundError, ValidationError } from "./../../../domain/dtos/errors/errors";



export const DataAPIEnergyGenerationRecordDto = z.object({
    _id: z.string(),
    serial_number: z.string(),
    energyGenerated: z.number(),
    timestamp: z.string(),
    intervalHours: z.number(),
    __v: z.number(),
});

export interface RecordDto {
    _id: string;
    serial_number: string;
    energyGenerated: number;
    timestamp: string;
    intervalHours: number;
    __v: number;
}

async function ZERO_GENERATION(payload: RecordDto) {
     // Check if it's daylight hours (6 AM - 6 PM)
    const timestamp = new Date(payload.timestamp);
    const hour = timestamp.getUTCHours();

  // Only check during daylight hours
    if (hour < 6 || hour > 18) return;
        // Check if all recent records show zero or near-zero generation

    if (payload.energyGenerated < 1) {
        const anomalyRecords = {
            SolarUnit_SN: payload.serial_number,
            energyGenRecordId: payload._id,
            anomalyType: 'ZERO_GENERATION',
            severity: 'CRITICAL',
            detectedAt: payload.timestamp,
            description: 'Solar Unit has not Generated Energy',
        }
        console.log(`🚨 CRITICAL: Zero generation anomaly detected for solar unit ${payload.serial_number}`);
        await AnomalyRecords.insertMany(anomalyRecords);
    }
}
async function GENERATION_DROP(payload: RecordDto, solarUnitId: mongoose.Types.ObjectId) {

    const timestamp = new Date(payload.timestamp);
    const sevenDaysAgo = new Date(timestamp.getTime()- 7 * 24 * 60 * 60 * 1000);
    const oneDayAgo = new Date(timestamp.getTime() - 24 * 60 * 60 * 1000);

     const historicalRecords = await EnergyGenerationRecord.find({
      solarUnit: solarUnitId,
      timestamp: { $gte: sevenDaysAgo, $lt: oneDayAgo },
    });

     if (historicalRecords.length < 10) return; // Not enough data

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
      todayRecords.reduce((sum, r) => sum + r.energyGenerated, 0) / todayRecords.length;

    // Check if today's generation is less than 50% of historical average
    const dropThreshold = 0.5;
    if (todayAverage < historicalAverage * dropThreshold){
        const anomalyRecords = {
            SolarUnit_SN: payload.serial_number,
            energyGenRecordId: payload._id,
            anomalyType: 'GENERATION_DROP',
            severity: 'WARNING',
            detectedAt: payload.timestamp,
            description: 'Solar Unit generated energy lower than Average',
        }
        console.log(`🚨 Warning: Generation Drop anomaly detected for solar unit ${payload.serial_number}`);
        await AnomalyRecords.insertMany(anomalyRecords);
    }
}

async function ABNORMAL_PEAK(payload: RecordDto, capacity: number){
    const timestamp = new Date(payload.timestamp);
    const serialNumber = payload.serial_number

    // Threshold: 120% of rated capacity
    const threshold = capacity * 1.2;

    if(payload.energyGenerated > threshold){
        const anomalyRecords = {
            SolarUnit_SN: payload.serial_number,
            energyGenRecordId: payload._id,
            anomalyType: 'ABNORMAL_PEAK',
            severity: 'WARNING',
            detectedAt: payload.timestamp,
            description: 'Solar Unit generated highly abnormal values',
        }
        console.log(`🚨 Warning: Abnomal Peak anomaly detected for solar unit ${payload.serial_number}`);
        await AnomalyRecords.insertMany(anomalyRecords);
    }

}
async function NIGHT_GENERATION(payload: RecordDto){
    const timestamp = new Date(payload.timestamp);
    const currentHour = timestamp.getUTCHours();

    const isNight = currentHour >= 19 || currentHour <= 5;

    if (!isNight) return;

    if(payload.energyGenerated > 0.5){
        const anomalyRecords = {
            SolarUnit_SN: payload.serial_number,
            energyGenRecordId: payload._id,
            anomalyType: 'NIGHT_GENERATION',
            severity: 'WARNING',
            detectedAt: payload.timestamp,
            description: 'Solar Unit generated in night time',
        }
        console.log(`🚨 Warning: Night Generation anomaly detected for solar unit ${payload.serial_number}`);
        await AnomalyRecords.insertMany(anomalyRecords);
    }
}

export const AnomalyDetection = async () => {
    try {
            const solarUnits = await SolarUnit.find();
    
            for (const solarUnit of solarUnits) {
    
                // Get latest synced timestamp to only fetch new data
                const lastSyncedRecord = await EnergyGenerationRecord
                    .findOne({ solarUnit: solarUnit._id })
                    .sort({ timestamp: -1 });
    
                // Build URL with sinceTimestamp query parameter
                const baseUrl = `http://localhost:8000/api/energy-generation-records/solar-unit/${solarUnit.serial_number}`;
                const url = new URL(baseUrl);
    
                if (lastSyncedRecord?.timestamp) {
                    url.searchParams.append('sinceTimestamp', lastSyncedRecord.timestamp.toISOString());
                }
    
                // Fetch latest records from data API with server-side filtering
                const dataAPIResponse = await fetch(url.toString());
                if (!dataAPIResponse.ok) {
                    throw new Error("Failed to fetch energy generation records from data API");
                }
    
                const Records = DataAPIEnergyGenerationRecordDto
                    .array()
                    .parse(await dataAPIResponse.json());
    
                if (Records.length > 0) {
                    // Transform API records to match schema
                    // const recordsToInsert = newRecords.map(record => ({
                    //     solarUnit: solarUnit._id,
                    //     energyGenerated: record.energyGenerated,
                    //     timestamp: new Date(record.timestamp),
                    //     intervalHours: record.intervalHours,
                    // }));
                    for (const Record of Records){
                        // Insert Anomaly Functions here param = newRecords
                        await ZERO_GENERATION(Record);
                        await GENERATION_DROP(Record, solarUnit._id);
                        await ABNORMAL_PEAK(Record, solarUnit.capacity);
                        await NIGHT_GENERATION(Record);
                        // Check the functions if they work..
                    }
                }
                else {
                    console.log("No new Energy Generation Records to Run Anomaly Detection");
                }
            }
        } catch (error) {
            console.error("Sync Job error:", error);
        }
}
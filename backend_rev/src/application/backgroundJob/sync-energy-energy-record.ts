import { z } from "zod";
import { EnergyGenerationRecord } from "./../../infastructure/entities/EnergyGenerationRecord";
import { SolarUnit } from "./../../infastructure/entities/solarUnit";
import { getAuth } from "@clerk/express";
import { RegisteredUser } from "./../../infastructure/entities/registeredUsers";
import { Request, Response, NextFunction } from "express";
import { NotFoundError, ValidationError } from "./../../domain/dtos/errors/errors";

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
export const syncEnergyGenerationRecords = async () => {
    try {

        const solarUnits = await SolarUnit.find();

        for (const solarUnit of solarUnits) {

            // Get latest synced timestamp to only fetch new data
            const lastSyncedRecord = await EnergyGenerationRecord
                .findOne({ solarUnit: solarUnit._id })
                .sort({ timestamp: -1 });

            // Build URL with sinceTimestamp query parameter
            const baseUrl = `https://solarpower-management-solarunit-api.onrender.com/api/energy-generation-records/solar-unit/${solarUnit.serial_number}`;
            const url = new URL(baseUrl);

            if (lastSyncedRecord?.timestamp) {
                url.searchParams.append('sinceTimestamp', lastSyncedRecord.timestamp.toISOString());
            }

            // Fetch latest records from data API with server-side filtering
            const dataAPIResponse = await fetch(url.toString());
            if (!dataAPIResponse.ok) {
                throw new Error("Failed to fetch energy generation records from data API");
            }

            const newRecords = DataAPIEnergyGenerationRecordDto
                .array()
                .parse(await dataAPIResponse.json());

            if (newRecords?.length > 0) {
                // Transform API records to match schema
                const recordsToInsert = newRecords.map(record => ({
                    solarUnit: solarUnit._id,
                    serialNumber: solarUnit.serial_number,
                    energyGenerated: record.energyGenerated,
                    timestamp: new Date(record.timestamp),
                    intervalHours: record.intervalHours,
                    processedForAnomaly: false,
                }));

                await EnergyGenerationRecord.insertMany(recordsToInsert);
                console.log(`Synced ${recordsToInsert.length} new energy generation records`);
            }
            else {
                console.log("No new records to sync");
            }
        }
    } catch (error) {
        console.error("Sync Job error:", error);
    }
};

//Sync per user
export const syncEnergyGenerationRecordsForUser = async ( req: Request,
  res: Response,
  next: NextFunction) => {
    try {
            const auth = getAuth(req);
            console.log("Authentication info:", auth);
            const clerkUserid = auth.userId;
            console.log("Clerk UserID:", clerkUserid);
            const user = await RegisteredUser.findOne({ clerkUserId: clerkUserid });
            console.log("User:", user?._id);
            if (!user) {
                throw new NotFoundError("User not found");
            }
        
            const solarUnit = await SolarUnit.findOne({ userID: user._id });
            console.log("Solar Unit:", solarUnit);
        
            if (!solarUnit) {
                throw new NotFoundError("Solarunit not found");
            }
    
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

            const newRecords = DataAPIEnergyGenerationRecordDto
                .array()
                .parse(await dataAPIResponse.json());

            if (newRecords.length > 0) {
                // Transform API records to match schema
                const recordsToInsert = newRecords.map(record => ({
                    solarUnit: solarUnit._id,
                    energyGenerated: record.energyGenerated,
                    timestamp: new Date(record.timestamp),
                    intervalHours: record.intervalHours,
                    processedForAnomaly: false,
                }));
                
                await EnergyGenerationRecord.insertMany(recordsToInsert);
                console.log(`Synced ${recordsToInsert.length} new energy generation records`);
            }
            else {
                console.log("No new records to sync");
            }
        
    } catch (error) {
        console.error("Sync Job error:", error);
    }
};


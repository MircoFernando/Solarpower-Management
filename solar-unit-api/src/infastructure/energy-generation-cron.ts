import cron from "node-cron";
import { EnergyGenerationRecord } from "./entities/EnergyGenerationRecord";
import { SolarUnit } from "./entities/solarUnits";
/**
 * Calculate realistic energy generation based on timestamp
 * Uses seasonal variations and time-of-day multipliers
 */


function calculateEnergyGeneration(timestamp: Date): number {
  const hour = timestamp.getUTCHours();
  const month = timestamp.getUTCMonth(); // 0-11

  // Base energy generation (higher in summer months)
  let baseEnergy = 200;
  if (month >= 5 && month <= 7) {
    // June-August (summer)
    baseEnergy = 300;
  } else if (month >= 2 && month <= 4) {
    // March-May (spring)
    baseEnergy = 250;
  } else if (month >= 8 && month <= 10) {
    // September-November (fall)
    baseEnergy = 200;
  } else {
    // December-February (winter)
    baseEnergy = 150;
  }

  // Adjust based on time of day (solar panels generate more during daylight)
  let timeMultiplier = 1;
  if (hour >= 6 && hour <= 18) {
    // Daylight hours
    timeMultiplier = 1.2;
    if (hour >= 10 && hour <= 14) {
      // Peak sun hours
      timeMultiplier = 1.5;
    }
  } else {
    // Night hours
    timeMultiplier = 0;
  }

  // Add some random variation (±20%)
  const variation = 0.8 + Math.random() * 0.4;
  const energyGenerated = Math.round(baseEnergy * timeMultiplier * variation);

  return energyGenerated;
}

/**
 * Generate a new energy generation record for the current time
 */
export async function generateNewRecord(serial_number: string) {
  try {
    const timestamp = new Date();
    
    // 2. Calculate
    const energyGenerated = calculateEnergyGeneration(timestamp);
    console.log(`[${timestamp.toISOString()}] Generating ${energyGenerated}kWh for ${serial_number}`);

    // 3. Store
    await EnergyGenerationRecord.create({
      serialNumber: serial_number,
      timestamp: timestamp,
      energyGenerated: energyGenerated,
      intervalHours: 2, 
    });

  } catch (error) {
    console.error(`Error generating energy for ${serial_number}:`, error);
  }
}



/**
 * Initialize the cron scheduler to generate energy records every 2 hours
 */
export const initializeEnergyCron = () => {
  // Default: Run every 2 hours
  const schedule = process.env.ENERGY_CRON_SCHEDULE || "0 */2 * * *";
  // const schedule = "* * * * *";

  console.log(`[Energy Cron] Scheduler initializing with schedule: ${schedule}`);

  // Schedule the master job
  cron.schedule(schedule, async () => {
    console.log(`[Energy Cron] Job triggered at ${new Date().toISOString()}`);
    
    try {
      // 1. Find active units
      const units = await SolarUnit.find({ status: "active" });

      await Promise.all(
        units.map((unit) => generateNewRecord(unit.serialNumber))
      );

      console.log(`[Energy Cron] Successfully processed ${units.length} units.`);
      
    } catch (err) {
      console.error("[Energy Cron] Failed:", err);
    }
  });
};

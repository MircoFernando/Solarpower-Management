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
export async function generateNewRecord(serial_number:string){
  try {
    const timestamp = new Date();

  // Get schedule from env or default to every 2 hours
  const schedule = process.env.ENERGY_CRON_SCHEDULE || '0 */2 * * *';

  // Create cron job for this specific solar unit
  const job = cron.schedule(schedule, async () => {
    console.log(`[${new Date().toISOString()}] Generating energy for ${serial_number}`);
    try {
      const energyGenerated = calculateEnergyGeneration(timestamp);

      //Store Generated Energy record
      const record = {
      serial_number: serial_number,
      timestamp,
      energyGenerated,
      intervalHours: 2,
    };

    await EnergyGenerationRecord.create(record);

    } catch (error) {
      console.error(`Error generating energy for ${serial_number}:`, error);
    }
  });
  // Start the job
  job.start();
  // Store the job
  
  console.log(`✅ Cron job started for ${serial_number} (Schedule: ${schedule})`);

  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Failed to generate energy record:`,
      error
    );
  }
}



/**
 * Initialize the cron scheduler to generate energy records every 2 hours
 */
export const initializeEnergyCron = () => {
  // Run every 2 hours on the hour (0 */2 * * *)
  const schedule = process.env.ENERGY_CRON_SCHEDULE || "0 */2 * * *";

  console.log(
    `[Energy Cron] Scheduler initializing.............`
  );

   cron.schedule(schedule, async () => {
    try {
      const units = await SolarUnit.find({ status: "active" });

      for (const unit of units) {
        await generateNewRecord(unit.serialNumber);
         console.log(
          `[Energy Cron] Scheduler initialized - ${unit.serialNumber}`
        );
      }
    } catch (err) {
      console.error("[Energy Cron] Failed:", err);
    }
  });

  console.log(
    `[Energy Cron] Scheduler initialized - Energy generation records will be created at: ${schedule}`
  );
};

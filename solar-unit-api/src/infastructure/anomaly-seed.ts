import mongoose from "mongoose";
import { EnergyGenerationRecord } from "./entities/EnergyGenerationRecord";
import dotenv from "dotenv";
import { connectDB } from "./db";

dotenv.config();

/**
 * Helper function to calculate realistic energy generation
 */
function calculateRealisticEnergy(timestamp: Date): number {
  const hour = timestamp.getUTCHours();
  const month = timestamp.getUTCMonth();

  let baseEnergy = 200;
  if (month >= 5 && month <= 7) {
    baseEnergy = 300; // Summer
  } else if (month >= 2 && month <= 4) {
    baseEnergy = 250; // Spring
  } else if (month >= 8 && month <= 10) {
    baseEnergy = 200; // Fall
  } else {
    baseEnergy = 150; // Winter
  }

  let timeMultiplier = 0;
  if (hour >= 6 && hour <= 18) {
    timeMultiplier = 1.2;
    if (hour >= 10 && hour <= 14) {
      timeMultiplier = 1.5;
    }
  }

  const variation = 0.8 + Math.random() * 0.4;
  return Math.round(baseEnergy * timeMultiplier * variation);
}

/**
 * Inject anomalies into the dataset
 */
function injectAnomalies(records: any[], serialNumber: string) {
  console.log("\n🔧 Injecting anomalies into dataset...\n");

  // ANOMALY 1: Zero Generation During Daylight (CRITICAL)
  // Simulate complete system failure on September 15, 2025 from 10 AM to 4 PM
  const zeroGenDate = new Date("2025-09-15T10:00:00Z");
  const zeroGenEndDate = new Date("2025-09-15T16:00:00Z");
  
  let zeroGenCount = 0;
  records.forEach((record) => {
    if (
      record.timestamp >= zeroGenDate &&
      record.timestamp <= zeroGenEndDate
    ) {
      record.energyGenerated = 0;
      zeroGenCount++;
    }
  });
  console.log(`✅ Anomaly 1: Zero generation injected (${zeroGenCount} records)`);
  console.log(`   Type: ZERO_GENERATION | Severity: CRITICAL`);
  console.log(`   Period: Sept 15, 2025, 10 AM - 4 PM`);
  console.log(`   Scenario: Complete system failure during peak hours\n`);

  // ANOMALY 2: Significant Generation Drop (WARNING)
  // Simulate 60% drop due to panel soiling on October 1-7, 2025
  const dropStartDate = new Date("2025-10-01T00:00:00Z");
  const dropEndDate = new Date("2025-10-07T23:59:59Z");
  
  let dropCount = 0;
  records.forEach((record) => {
    if (
      record.timestamp >= dropStartDate &&
      record.timestamp <= dropEndDate &&
      record.energyGenerated > 0
    ) {
      record.energyGenerated = Math.round(record.energyGenerated * 0.4); // 60% drop
      dropCount++;
    }
  });
  console.log(`✅ Anomaly 2: Generation drop injected (${dropCount} records)`);
  console.log(`   Type: GENERATION_DROP | Severity: WARNING`);
  console.log(`   Period: Oct 1-7, 2025`);
  console.log(`   Scenario: 60% reduction due to panel soiling/shading\n`);

  // ANOMALY 3: Abnormal Peak Generation (WARNING)
  // Simulate sensor calibration error on November 10, 2025
  const peakDate = new Date("2025-11-10T12:00:00Z");
  const peakEndDate = new Date("2025-11-10T14:00:00Z");
  
  let peakCount = 0;
  records.forEach((record) => {
    if (
      record.timestamp >= peakDate &&
      record.timestamp <= peakEndDate
    ) {
      // Generate 150% of normal (exceeds rated capacity)
      record.energyGenerated = Math.round(record.energyGenerated * 2.5);
      peakCount++;
    }
  });
  console.log(`✅ Anomaly 3: Abnormal peak injected (${peakCount} records)`);
  console.log(`   Type: ABNORMAL_PEAK | Severity: WARNING`);
  console.log(`   Period: Nov 10, 2025, 12 PM - 2 PM`);
  console.log(`   Scenario: Sensor calibration error causing inflated readings\n`);

  // ANOMALY 4: Night Generation (INFO)
  // Simulate sensor malfunction reporting generation at night on November 20, 2025
  const nightDate = new Date("2025-11-20T22:00:00Z");
  const nightEndDate = new Date("2025-11-21T04:00:00Z");
  
  let nightCount = 0;
  records.forEach((record) => {
    if (
      record.timestamp >= nightDate &&
      record.timestamp <= nightEndDate
    ) {
      // Add unexpected night generation (5-15 kWh)
      record.energyGenerated = Math.round(5 + Math.random() * 10);
      nightCount++;
    }
  });
  console.log(`✅ Anomaly 4: Night generation injected (${nightCount} records)`);
  console.log(`   Type: NIGHT_GENERATION | Severity: INFO`);
  console.log(`   Period: Nov 20, 2025, 10 PM - Nov 21, 4 AM`);
  console.log(`   Scenario: Sensor malfunction reporting false readings at night\n`);

  // ANOMALY 5: Additional Zero Generation (CRITICAL)
  // Another failure on December 5, 2025
  const zeroGen2Date = new Date("2025-12-05T08:00:00Z");
  const zeroGen2EndDate = new Date("2025-12-05T18:00:00Z");
  
  let zeroGen2Count = 0;
  records.forEach((record) => {
    if (
      record.timestamp >= zeroGen2Date &&
      record.timestamp <= zeroGen2EndDate
    ) {
      record.energyGenerated = 0;
      zeroGen2Count++;
    }
  });
  console.log(`✅ Anomaly 5: Second zero generation injected (${zeroGen2Count} records)`);
  console.log(`   Type: ZERO_GENERATION | Severity: CRITICAL`);
  console.log(`   Period: Dec 5, 2025, 8 AM - 6 PM`);
  console.log(`   Scenario: Inverter failure - full day outage\n`);

  // ANOMALY 6: Gradual Performance Degradation (WARNING)
  // Simulate gradual decline in November due to equipment aging
  const degradeStartDate = new Date("2025-11-01T00:00:00Z");
  const degradeEndDate = new Date("2025-11-30T23:59:59Z");
  
  let degradeCount = 0;
  records.forEach((record) => {
    if (
      record.timestamp >= degradeStartDate &&
      record.timestamp <= degradeEndDate &&
      record.energyGenerated > 0
    ) {
      // Gradual 20-30% reduction
      const dayOfMonth = record.timestamp.getUTCDate();
      const degradationFactor = 1 - (dayOfMonth / 30) * 0.25; // 25% reduction by end of month
      record.energyGenerated = Math.round(record.energyGenerated * degradationFactor);
      degradeCount++;
    }
  });
  console.log(`✅ Anomaly 6: Gradual degradation injected (${degradeCount} records)`);
  console.log(`   Type: GENERATION_DROP | Severity: WARNING`);
  console.log(`   Period: November 2025 (progressive)`);
  console.log(`   Scenario: Equipment aging causing gradual performance decline\n`);

  console.log("🎯 Anomaly injection complete!\n");
  
  return records;
}

async function seed() {
  const serialNumber = "SU-0007";

  try {
    await connectDB();

    // Clear existing data
    await EnergyGenerationRecord.deleteMany({});
    console.log("🗑️  Cleared existing records\n");

    // Create historical energy generation records
    const records = [];
    const startDate = new Date("2025-08-01T08:00:00Z");
    const endDate = new Date("2025-12-23T08:00:00Z");

    let currentDate = new Date(startDate);
    let recordCount = 0;

    console.log("📊 Generating baseline energy records...\n");

    // Generate baseline normal data
    while (currentDate <= endDate) {
      const energyGenerated = calculateRealisticEnergy(currentDate);

      records.push({
        serialNumber: serialNumber,
        timestamp: new Date(currentDate),
        energyGenerated: energyGenerated,
        intervalHours: 2,
      });

      currentDate = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);
      recordCount++;
    }

    console.log(`✅ Generated ${recordCount} baseline records\n`);

    // Inject anomalies
    const recordsWithAnomalies = injectAnomalies(records, serialNumber);

    // Insert all records
    await EnergyGenerationRecord.insertMany(recordsWithAnomalies);

    // console.log("="`.repeat(60));
    // console.log(`✅ DATABASE SEEDED SUCCESSFULLY`);
    // console.log("="`.repeat(60));
    // console.log(`📅 Period: ${startDate.toUTCString()} to ${endDate.toUTCString()}`);
    // console.log(`📊 Total records: ${recordCount}`);
    // console.log(`🔴 Anomalies injected: 6 types`);
    // console.log(`🔢 Serial Number: ${serialNumber}`);
    // console.log("="`.repeat(60));
    // console.log("\n📋 ANOMALY SUMMARY:");
    // console.log("   1. Zero Generation (Sept 15) - CRITICAL");
    // console.log("   2. Generation Drop (Oct 1-7) - WARNING");
    // console.log("   3. Abnormal Peak (Nov 10) - WARNING");
    // console.log("   4. Night Generation (Nov 20-21) - INFO");
    // console.log("   5. Zero Generation (Dec 5) - CRITICAL");
    // console.log("   6. Gradual Degradation (Nov 1-30) - WARNING\n");
    
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Database connection closed\n");
  }
}

seed();
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./db"; 
import { EnergyGenerationRecord } from "./../infastructure/entities/EnergyGenerationRecord"; 
import { SolarUnit } from "./../infastructure/entities/solarUnits"; 

dotenv.config();

const injectAbnormalPeaks = async () => {
  try {
    console.log("🔌 Connecting to DB...");
    await connectDB();

    const targetUnit = await SolarUnit.findOne();

    if (!targetUnit) {
      console.error("❌ No Solar Units found! Cannot inject anomalies.");
      process.exit(1);
    }

    console.log(`🎯 Targeting Unit: ${targetUnit.serialNumber}`);

    const today = new Date();

    today.setHours(10, 0, 0, 0); 
    
    const anomalyRecords = [];
    const capacity = 5000

    // 3. Generate exactly 10 Anomalous Records
    console.log("⚡ Generating 10 Abnormal Peak records for TODAY...");

    for (let i = 0; i < 10; i++) {
      // Create a timestamp spaced by 30 minutes
      const recordTime = new Date(today.getTime() + i * 30 * 60 * 1000);

      // FORCE TRIGGER: Value must be > capacity
      // We set it to 150% - 200% of capacity
      const spikeFactor = 1.5 + Math.random() * 0.5; 
      const abnormalValue = Math.round(capacity * spikeFactor);

      anomalyRecords.push({
        solarUnit: targetUnit._id,
        serialNumber: targetUnit.serialNumber,
        timestamp: recordTime,
        energyGenerated: abnormalValue, // <--- This triggers your function
        intervalHours: 0.5,
      });

      console.log(
        `   • [${recordTime.toLocaleTimeString()}] Generated: ${abnormalValue}W (Capacity: ${capacity}W)`
      );
    }

    // 4. Insert into Database (Appending, NOT deleting)
    await EnergyGenerationRecord.insertMany(anomalyRecords);

    console.log("\n✅ Successfully injected 10 Abnormal Peak anomalies.");
    console.log("👉 Run your Anomaly Detection job now to see the alerts.");

  } catch (error) {
    console.error("❌ Seeding Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected.");
    process.exit(0);
  }
};

injectAbnormalPeaks();
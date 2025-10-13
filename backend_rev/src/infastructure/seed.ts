import mongoose from "mongoose";
import { SolarUnit } from "./entities/solarUnit";
import { EnergyGenerationRecord } from "./entities/EnergyGenerationRecord";
import { User } from "./entities/user";
import { connectDB } from "./db";
import dotenv from "dotenv"; // Import and configure dotenv this is used to load environment variables from a .env file into process.env
dotenv.config();

// Helper function to get seasonal base generation (kWh)
const getSeasonalBase = (date: Date): number => {
    const month = date.getUTCMonth(); // 0-11
    
    // Summer (June-August): months 5, 6, 7
    if (month >= 5 && month <= 7) return 300;
    
    // Spring (March-May): months 2, 3, 4
    if (month >= 2 && month <= 4) return 250;
    
    // Fall (September-November): months 8, 9, 10
    if (month >= 8 && month <= 10) return 200;
    
    // Winter (December-February): months 11, 0, 1
    return 150;
};

// Helper function to get time-of-day multiplier
const getTimeMultiplier = (date: Date): number => {
    const hour = date.getUTCHours();
    
    // Peak sun hours (10am-2pm): 1.5x multiplier
    if (hour >= 10 && hour < 14) return 1.5;
    
    // Daylight hours (6am-6pm): 1.2x multiplier
    if (hour >= 6 && hour < 18) return 1.2;
    
    // Night hours: 0.1x multiplier
    return 0.1;
};

// Helper function to generate energy with variation
const generateEnergy = (date: Date): number => {
    const base = getSeasonalBase(date);
    const timeMultiplier = getTimeMultiplier(date);
    
    // Random variation ±20%
    const randomVariation = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    
    const energy = base * timeMultiplier * randomVariation;
    
    // Round to 2 decimal places
    return Math.round(energy * 100) / 100;
};

const seed = async () => {
    await connectDB();

    // Clear existing data
    await SolarUnit.deleteMany({});
    await EnergyGenerationRecord.deleteMany({});
    await User.deleteMany({});

    // Create a new user with the specified fields
    const user = await User.create({
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "9876543210"
        // createdAt will be set automatically
    });

    // Create a new solar unit linked to the user
    const solarUnit = await SolarUnit.create({
        userID: user._id,
        HouseID: 1,
        capacity: 1200,
        serial_number: "SN20250928",
        installation_date: new Date("2025-09-28"),
        status: "active"
    });

    // Generate energy records every 2 hours from Aug 1, 2025 8pm to Oct 12, 2025 8am
    const records = [];
    const startDate = new Date("2025-08-01T20:00:00Z");
    const endDate = new Date("2025-10-12T08:00:00Z");
    let current = new Date(startDate);

    while (current <= endDate) {
        records.push({
            solarUnit: solarUnit._id,
            energyGenerated: generateEnergy(current),
            timestamp: new Date(current),
            intervalHours: 2
        });
        current.setHours(current.getHours() + 2);
    }
    
    await EnergyGenerationRecord.insertMany(records);

    console.log(`Database seeded successfully with ${records.length} energy records.`);
    console.log(`Time range: ${startDate.toISOString()} to ${endDate.toISOString()}`);
    console.log(`Interval: Every 2 hours`);
    
    mongoose.connection.close();
};

seed();
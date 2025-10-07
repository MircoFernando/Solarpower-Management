import mongoose from "mongoose";
import { SolarUnit } from "./entities/solarUnit";
import { EnergyGenerationRecord } from "./entities/EnergyGenerationRecord";
import { User } from "./entities/user";
import { connectDB } from "./db";
import dotenv from "dotenv";
dotenv.config();

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

    // Add 10 sequential energy generation records
    const records = [];
    let baseDate = new Date("2025-10-05T08:00:00Z");
    for (let i = 0; i < 10; i++) {
        records.push({
            solarUnit: solarUnit._id,
            energyGenerated: 100 + i * 10,
            timestamp: new Date(baseDate.getTime() + i * 2 * 60 * 60 * 1000),
            intervalHours: 2
        });
    }
    await EnergyGenerationRecord.insertMany(records);

    console.log("Database seeded successfully.");
    mongoose.connection.close();
};

seed();
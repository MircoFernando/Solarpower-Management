"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const solarUnit_1 = require("./entities/solarUnit");
const EnergyGenerationRecord_1 = require("./entities/EnergyGenerationRecord");
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const seed = async () => {
    (0, db_1.connectDB)();
    // Clear existing data
    await solarUnit_1.SolarUnit.deleteMany({});
    await EnergyGenerationRecord_1.EnergyGenerationRecord.deleteMany({});
    // Create a new solar unit
    const solarUnit = await solarUnit_1.SolarUnit.create({
        userID: 1,
        HouseID: 1,
        capacity: 1200,
        serial_number: "SN20250928",
        installation_date: new Date("2025-09-28"),
        status: "active"
    });
    // Add 10 sequential energy generation records
    const records = [];
    let baseDate = new Date("2025-09-28T08:00:00Z");
    for (let i = 0; i < 10; i++) {
        records.push({
            solarUnit: solarUnit._id,
            energyGenerated: 100 + i * 10, // Example: incrementing energy
            timestamp: new Date(baseDate.getTime() + i * 2 * 60 * 60 * 1000), // 2 hour intervals
            intervalHours: 2
        });
    }
    await EnergyGenerationRecord_1.EnergyGenerationRecord.insertMany(records);
    console.log("Database seeded successfully.");
    mongoose_1.default.connection.close();
};
seed();

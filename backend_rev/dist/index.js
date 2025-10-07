"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv")); // Load env vars before using them
const solar_unit_1 = __importDefault(require("./api/solar-unit"));
const energy_generation_record_1 = __importDefault(require("./api/energy-generation-record"));
const db_1 = require("./infastructure/db");
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use(express_1.default.json()); // Convert incoming JSON requests to JS objects
server.use("/api/solar-units", solar_unit_1.default);
server.use("/api/energy-generation-records", energy_generation_record_1.default);
(0, db_1.connectDB)(); // Connect to the database
const Port = 3000;
server.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
console.log('Hello, World!');

import express from 'express';
import dotenv from "dotenv"; // Load env vars before using them
import solarUnitRouter from './api/solar-unit';
import EnergyRecordRouter from './api/energy-generation-record';
import { connectDB } from './infastructure/db';  
import { loggerMiddleware } from './api/middleware/logger-middleware';
import { globalErrorHandlingMiddleware } from './api/middleware/global-error-handling-middleware';
import cors from 'cors';

dotenv.config(); 
const server = express();

server.use(express.json()); // Convert incoming JSON requests to JS objects
server.use(cors({origin: "http://localhost:5173"})); // Enable CORS for all routes
server.use(loggerMiddleware); // Use the logger middleware
server.use("/api/solar-units", solarUnitRouter);
server.use("/api/energy-generation-records", EnergyRecordRouter);
server.use(globalErrorHandlingMiddleware); // (err, res, req, next) are global error handlers, Use the global error handling middleware

connectDB(); // Connect to the database

const Port = process.env.PORT || 3000;
server.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});

console.log('Hello, World!');
import express from 'express';
import dotenv from "dotenv"; // Load env vars before using them
import solarUnitRouter from './api/solar-unit';
import EnergyRecordRouter from './api/energy-generation-record';
import userRouter from './api/users';
import { connectDB } from './infastructure/db';  
import { loggerMiddleware } from './api/middleware/logger-middleware';
import { initializeScheduler } from "./infastructure/scheduler";
import { globalErrorHandlingMiddleware } from './api/middleware/global-error-handling-middleware';
import webHooksRouter from './api/web-hooks/webhooks';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import Metricsrouter from './api/metrics';
import AnomalyRecordsRouter from './api/anomaly';
import InvoiceRouter from './api/invoice';
import PaymentRouter from './api/payments';

dotenv.config(); 
const server = express();
server.use("/api/webhooks", webHooksRouter);
server.use(clerkMiddleware())
server.use(express.json()); // Convert incoming JSON requests to JS objects
// server.use(cors({origin: process.env.FRONTEND_URL})); // Enable CORS for all routes
server.use(loggerMiddleware); // Use the logger middleware
server.use("/api/solar-units", solarUnitRouter);
server.use("/api/energy-generation-records", EnergyRecordRouter);
server.use("/api/anomaly-records", AnomalyRecordsRouter);
server.use("/api/users", userRouter);
server.use("/api/metrics", Metricsrouter);
server.use("/api/invoices", InvoiceRouter);
server.use("/api/payments", PaymentRouter);
server.use(globalErrorHandlingMiddleware); // (err, res, req, next) are global error handlers, Use the global error handling middleware

connectDB(); // Connect to the database
initializeScheduler();

const Port = process.env.PORT || 3000;
server.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});

console.log('Hello, World!');
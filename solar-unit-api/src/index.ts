import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import { globalErrorHandler } from "./api/middleware/global-error-handling-middleware"
import { loggerMiddleware } from "./api/middleware/logger-middleware"
import { connectDB } from "./infastructure/db";
import energyGenerationRecordRouter from "./api/energy-generation-records"
import { initializeEnergyCron } from "./infastructure/energy-generation-cron";


dotenv.config();
const server = express();
// server.use(cors({ origin: "http://localhost:5173" }));
server.use(express.json());
server.use(loggerMiddleware);
server.use("/api/energy-generation-records", energyGenerationRecordRouter);
server.use(globalErrorHandler);
connectDB();
initializeEnergyCron();

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import { getAllEnergyGenerationRecordsBySerialNumber } from "./../application/energy-generation-records";

const energyGenerationRecordRouter = express.Router();

energyGenerationRecordRouter
  .route("/solar-unit/:serialNumber")
  .get(getAllEnergyGenerationRecordsBySerialNumber);

export default energyGenerationRecordRouter;
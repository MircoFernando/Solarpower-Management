import express from "express";
import {
  getAllEnergyGenerationRecordsBySerialNumber,
  SolarUnitRegistry,
} from "./../application/energy-generation-records";

const energyGenerationRecordRouter = express.Router();

energyGenerationRecordRouter
  .route("/solar-unit/:serialNumber")
  .get(getAllEnergyGenerationRecordsBySerialNumber);
energyGenerationRecordRouter
  .route("/solar-unit/new-unit")
  .post(SolarUnitRegistry);
export default energyGenerationRecordRouter;

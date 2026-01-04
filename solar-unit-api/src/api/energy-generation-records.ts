import express from "express";
import {
  getAllEnergyGenerationRecordsBySerialNumber,
  SolarUnitRegistry,
} from "./../application/energy-generation-records";
import { authenticationMiddleware } from "./middleware/authentication-middleware";

const energyGenerationRecordRouter = express.Router();

energyGenerationRecordRouter
  .route("/solar-unit/:serialNumber")
  .get(authenticationMiddleware, getAllEnergyGenerationRecordsBySerialNumber);
energyGenerationRecordRouter
  .route("/solar-unit/new-unit")
  .post(authenticationMiddleware, SolarUnitRegistry);
export default energyGenerationRecordRouter;

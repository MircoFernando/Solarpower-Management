"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const energy_generation_record_1 = require("../application/energy-generation-record");
const energyGenerationRecordRouter = express_1.default.Router();
energyGenerationRecordRouter.route('/solar-units/:id').get(energy_generation_record_1.getEnergyRecordsBySolarUnitId);
energyGenerationRecordRouter.route('/solar-units').get(energy_generation_record_1.getallEnergyRecords);
exports.default = energyGenerationRecordRouter;

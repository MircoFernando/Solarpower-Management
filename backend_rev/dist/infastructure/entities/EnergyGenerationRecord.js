"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyGenerationRecord = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const energyGenerationRecordSchema = new mongoose_1.default.Schema({
    solarUnit: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'SolarUnit', required: true },
    energyGenerated: { type: Number, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    intervalHours: { type: Number, defualt: 2, min: 0.1, max: 24 },
});
exports.EnergyGenerationRecord = mongoose_1.default.model('EnergyGenerationRecord', energyGenerationRecordSchema);

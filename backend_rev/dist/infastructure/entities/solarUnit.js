"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarUnit = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const solarUnitSchema = new mongoose_1.default.Schema({
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    serial_number: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    houseID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'House', unique: true },
    installation_date: { type: Date, required: true },
    status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'active' },
});
exports.SolarUnit = mongoose_1.default.model('SolarUnit', solarUnitSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallEnergyRecords = exports.getEnergyRecordsBySolarUnitId = void 0;
const EnergyGenerationRecord_1 = require("../infastructure/entities/EnergyGenerationRecord");
const getEnergyRecordsBySolarUnitId = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await EnergyGenerationRecord_1.EnergyGenerationRecord.findById(id);
        if (!record) {
            return res.status(404).json({ message: "Energy generation record not found" });
        }
        res.status(200).json(record);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving energy generation record", error: error.message });
    }
};
exports.getEnergyRecordsBySolarUnitId = getEnergyRecordsBySolarUnitId;
const getallEnergyRecords = async (req, res) => {
    try {
        const records = await EnergyGenerationRecord_1.EnergyGenerationRecord.find();
        if (!records) {
            return res.status(404).json({ message: "No energy generation records found" });
        }
        res.status(200).json(records);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving energy generation records", error: error.message });
    }
};
exports.getallEnergyRecords = getallEnergyRecords;

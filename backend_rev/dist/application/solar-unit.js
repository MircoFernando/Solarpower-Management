"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSolarUnitById = exports.updateSolarUnitById = exports.getSolarUnitById = exports.createSolarUnit = exports.getAllSolarUnits = void 0;
const solarUnit_1 = require("../infastructure/entities/solarUnit");
const getAllSolarUnits = async (req, res) => {
    try {
        const solarUnits = await solarUnit_1.SolarUnit.find();
        res.status(200).json(solarUnits);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving solar units", error: error.message });
    }
};
exports.getAllSolarUnits = getAllSolarUnits;
const createSolarUnit = async (req, res) => {
    const { capacity, serial_number, installation_date, status } = req.body;
    const newSolarUnit = {
        capacity,
        serial_number,
        installation_date,
        status
    };
    try {
        const createdSolarUnit = await solarUnit_1.SolarUnit.create(newSolarUnit);
        res.status(200).json(createdSolarUnit);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating solar unit", error: error.message });
    }
};
exports.createSolarUnit = createSolarUnit;
const getSolarUnitById = async (req, res) => {
    try {
        const { id } = req.params;
        const solarUnit = await solarUnit_1.SolarUnit.findById(id);
        if (!solarUnit) {
            return res.status(404).json({ message: "Solar unit not found" });
        }
        res.status(200).json(solarUnit);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving solar unit", error: error.message });
    }
};
exports.getSolarUnitById = getSolarUnitById;
const updateSolarUnitById = async (req, res) => {
    try {
        const { id } = req.params;
        const { capacity, serial_number, installation_date, status } = req.body;
        const solarUnit = await solarUnit_1.SolarUnit.findById(id);
        if (!solarUnit) {
            return res.status(404).json({ message: "Solar unit not found" });
        }
        const updatedSolarUnit = await solarUnit_1.SolarUnit.findByIdAndUpdate(id, {
            capacity,
            serial_number,
            installation_date,
            status
        }, { new: true });
        res.status(200).json(updatedSolarUnit);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating solar unit", error: error.message });
    }
};
exports.updateSolarUnitById = updateSolarUnitById;
const deleteSolarUnitById = async (req, res) => {
    try {
        const { id } = req.params;
        const solarUnit = await solarUnit_1.SolarUnit.findById(id);
        if (!solarUnit) {
            return res.status(404).json({ message: "Solarunit not found" });
        }
        await solarUnit_1.SolarUnit.findByIdAndDelete(id);
        res.status(200).json({ message: "Solar unit deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting solar unit", error: error.message });
    }
};
exports.deleteSolarUnitById = deleteSolarUnitById;

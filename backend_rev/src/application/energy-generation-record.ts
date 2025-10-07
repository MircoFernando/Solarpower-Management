import { EnergyGenerationRecord } from "../infastructure/entities/EnergyGenerationRecord";
import { Request, Response } from 'express';

export const getEnergyRecordsBySolarUnitId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const record = await EnergyGenerationRecord.findById(id);
        if (!record) {
            return res.status(404).json({ message: "Energy generation record not found" });
        }
        res.status(200).json(record);
    }
    catch (error: any) {
        res.status(500).json({ message: "Error retrieving energy generation record", error: error.message });
    }
};

export const getallEnergyRecords = async (req: Request, res: Response) => {
    try {
        const records = await EnergyGenerationRecord.find();
        if (!records) {
            return res.status(404).json({ message: "No energy generation records found" });
        }
        res.status(200).json(records);
    }
    catch (error: any) {
        res.status(500).json({ message: "Error retrieving energy generation records", error: error.message });
    }
};

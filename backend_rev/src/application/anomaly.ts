import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { SolarUnit } from "./../infastructure/entities/solarUnit";
import { EnergyGenerationRecord } from "./../infastructure/entities/EnergyGenerationRecord";
import { RegisteredUser } from "./../infastructure/entities/registeredUsers";
import { AnomalyRecords } from "../infastructure/entities/Anomolies";

export const getAnomalyForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = getAuth(req);
    const user = await RegisteredUser.findOne({ clerkUserId: auth.userId });
    const { groupBy} = req.query;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const solarUnit = await SolarUnit.findOne({ userID: user._id });

    if (!solarUnit) {
      return res.status(404).json({ error: "No solar unit found" });
    }

    if(!groupBy){
        const Anomalies = await AnomalyRecords.find({
      solarUnit_SN: solarUnit.serial_number,
    }).sort({DetectedAt: -1}); 

    if (!Anomalies) {
      return res.status(404).json({ error: "No Anomalies found for user" });
    }

    res.status(200).json(Anomalies);

    }

    if (groupBy === "date") {
      const anomalies = await AnomalyRecords.aggregate([
        {
          $match: {
            solarUnit_SN: solarUnit.serial_number,
          },
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$detectedAt",
                },
              },
              anomalyType: "$anomalyType",
              severity: "$severity",
            },
            startTime: { $min: "$detectedAt" },
            endTime: { $max: "$detectedAt" },
            occurrences: { $sum: 1 },
            status: { $first: "$status" },
            description: { $first: "$description" },
          },
        },
        {
          $sort: { "_id.date": -1 },
        },
        {
          $project: {
            _id: 0,
            date: "$_id.date",
            anomalyType: "$_id.anomalyType",
            severity: "$_id.severity",
            startTime: 1,
            endTime: 1,
            occurrences: 1,
            status: 1,
            description: 1,
          },
        },
      ]);
      return res.status(200).json(anomalies);
    }

  } catch (error: any) {
    next(error); // Pass the error to the global error handler
  }
};

export const getAllAnomalyRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => { 
    try{

        const { groupBy} = req.query;

    if(!groupBy){
    const Anomalies = await AnomalyRecords.find().sort({detectedAt: -1})

        if (!Anomalies) {
            return res.status(404).json({ error: "No Anomalies found for user" });
        }

        res.status(200).json(Anomalies);

    }
    if (groupBy === "date") {
      const anomalies = await AnomalyRecords.aggregate([
        {
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$detectedAt",
                },
              },
              serialNumber: "$solarUnit_SN",
              anomalyType: "$anomalyType",
              severity: "$severity",
            },
            startTime: { $min: "$detectedAt" },
            endTime: { $max: "$detectedAt" },
            occurrences: { $sum: 1 },
            status: { $first: "$status" },
            description: { $first: "$description" },
          },
        },
        {
          $sort: { "_id.date": -1 },
        },
        {
          $project: {
            _id: 0,
            date: "$_id.date",
            serialNumber: "$_id.serialNumber",
            anomalyType: "$_id.anomalyType",
            severity: "$_id.severity",
            startTime: 1,
            endTime: 1,
            occurrences: 1,
            status: 1,
            description: 1,
          },
        },
      ]);

      return res.status(200).json(anomalies);
    }

    } catch (error: any){
        next(error);
    }
};

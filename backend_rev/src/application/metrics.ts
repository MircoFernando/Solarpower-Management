import { Request, Response, NextFunction } from 'express';
import { getAuth } from "@clerk/express";
import { SolarUnit } from './../infastructure/entities/solarUnit';
import { EnergyGenerationRecord } from './../infastructure/entities/EnergyGenerationRecord';
import { RegisteredUser } from './../infastructure/entities/registeredUsers';

/**
 * Calculate Capacity Factor
 * Formula: (Actual Energy Generated / Theoretical Maximum) × 100%
 */
export const getCapacityFactor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = getAuth(req);
    const user = await RegisteredUser.findOne({ clerkUserId: auth.userId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const solarUnit = await SolarUnit.findOne({ userID: user._id });
    
    if (!solarUnit) {
      return res.status(404).json({ error: 'No solar unit found' });
    }

    // Get date range (last 30 days by default)
    const daysBack = parseInt(req.query.days as string) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    // Get all energy records for the period
    const records = await EnergyGenerationRecord.find({
      solarUnit: solarUnit._id,
      timestamp: { $gte: startDate },
    }).sort({ timestamp: 1 });

    if (records.length === 0) {
      return res.json({
        capacityFactor: 0,
        actualEnergy: 0,
        theoreticalMax: 0,
        dailyData: [],
      });
    }

    // Calculate capacity factor per day
    const dailyData: Array<{
      date: string;
      capacityFactor: number;
      actualEnergy: number;
      theoreticalMax: number;
    }> = [];

    // Group records by day
    const recordsByDay = new Map<string, typeof records>();
    
    records.forEach((record) => {
      const dateKey = record.timestamp.toISOString().split('T')[0];
      if (!recordsByDay.has(dateKey)) {
        recordsByDay.set(dateKey, []);
      }
      recordsByDay.get(dateKey)!.push(record);
    });

    // Calculate capacity factor for each day
    recordsByDay.forEach((dayRecords, dateKey) => {
      // Actual energy generated (sum of all records)
      const actualEnergy = dayRecords.reduce(
        (sum, record) => sum + record.energyGenerated,
        0
      );

      // Theoretical maximum = capacity * 24 hours * efficiency factor
      // Assuming optimal conditions: ~5 peak sun hours per day on average
      const peakSunHours = 5;
      const theoreticalMax = solarUnit.capacity * peakSunHours;

      // Capacity factor percentage
      const capacityFactor = (actualEnergy / theoreticalMax) * 100;

      dailyData.push({
        date: dateKey,
        capacityFactor: parseFloat(capacityFactor.toFixed(2)),
        actualEnergy: parseFloat(actualEnergy.toFixed(2)),
        theoreticalMax: parseFloat(theoreticalMax.toFixed(2)),
      });
    });

    // Calculate overall capacity factor
    const totalActual = dailyData.reduce((sum, day) => sum + day.actualEnergy, 0);
    const totalTheoretical = dailyData.reduce((sum, day) => sum + day.theoreticalMax, 0);
    const overallCapacityFactor = (totalActual / totalTheoretical) * 100;

    res.json({
      capacityFactor: parseFloat(overallCapacityFactor.toFixed(2)),
      actualEnergy: parseFloat(totalActual.toFixed(2)),
      theoreticalMax: parseFloat(totalTheoretical.toFixed(2)),
      capacity: solarUnit.capacity,
      period: {
        start: startDate.toISOString(),
        end: new Date().toISOString(),
        days: daysBack,
      },
      dailyData,
    });
  } catch (error) {
    next(error);
  }
};

export const getPeakOffPeakDistribution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = getAuth(req);
    const user = await RegisteredUser.findOne({ clerkUserId: auth.userId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const solarUnit = await SolarUnit.findOne({ userID: user._id });
    
    if (!solarUnit) {
      return res.status(404).json({ error: 'No solar unit found' });
    }

    const daysBack = parseInt(req.query.days as string) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    const records = await EnergyGenerationRecord.find({
      solarUnit: solarUnit._id,
      timestamp: { $gte: startDate },
    });

    // Classify records
    let peakEnergy = 0; // 10 AM - 2 PM
    let offPeakEnergy = 0; // All other times

    records.forEach((record) => {
      const hour = record.timestamp.getUTCHours();
      if (hour >= 10 && hour <= 14) {
        peakEnergy += record.energyGenerated;
      } else {
        offPeakEnergy += record.energyGenerated;
      }
    });

    const total = peakEnergy + offPeakEnergy;

    res.json({
      peak: {
        energy: parseFloat(peakEnergy.toFixed(2)),
        percentage: parseFloat(((peakEnergy / total) * 100).toFixed(2)),
      },
      offPeak: {
        energy: parseFloat(offPeakEnergy.toFixed(2)),
        percentage: parseFloat(((offPeakEnergy / total) * 100).toFixed(2)),
      },
      total: parseFloat(total.toFixed(2)),
    });
  } catch (error) {
    next(error);
  }
};

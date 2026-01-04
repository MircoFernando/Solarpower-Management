import { SolarUnit } from "./../../../infastructure/entities/solarUnit";
import { getAuth } from "@clerk/express";
import { RegisteredUser } from "./../../../infastructure/entities/registeredUsers";
import { Request, Response, NextFunction } from "express";
import { Invoice } from "../../../infastructure/entities/Invoice";
import { EnergyGenerationRecord } from "../../../infastructure/entities/EnergyGenerationRecord";

export const generateInvoice = async () => {
    const ratePerKWh = 0.5; 
    try {
        console.log("Starting Invoice Generation Job...");
        

        const solarUnits = await SolarUnit.find({status: "active"});

        const RATE_PER_KWH = 0.5;
        
        if (solarUnits.length === 0) {
            console.log("No solar units found to invoice.");
            return;
        }

        // 2. Process each unit
        for (const unit of solarUnits) {
            try {
                // Find the owner
                const user = await RegisteredUser.findById(unit.userID);
                if (!user) {
                    console.warn(`User not found for Solar Unit ${unit.serial_number}. Skipping.`);
                    continue;
                }

                // 3. Determine Billing Period
                const lastInvoice = await Invoice.findOne({ solarUnitId: unit._id })
                    .sort({ billingPeriodEnd: -1 });

                const startDate = lastInvoice 
                    ? new Date(lastInvoice.billingPeriodEnd) 
                    : new Date(unit.installation_date);

                // End Date: Exactly one month after the start date
                const targetEndDate = new Date(startDate);
                targetEndDate.setMonth(targetEndDate.getMonth() + 1);

                const latestRecord = await EnergyGenerationRecord
                    .findOne({ solarUnit: unit._id })
                    .sort({ timestamp: -1 })

                if(!latestRecord){
                    console.log("No records found the SolarUnit");
                }

                // If we have no records at all, or the latest record is OLDER than our target billing date,
                if (!latestRecord || new Date(latestRecord.timestamp) < targetEndDate) {
                    console.log(`Skipping Unit ${unit.serial_number}: Data only synced up to ${latestRecord?.timestamp ?? 'Never'}. Need data until ${targetEndDate}`);
                    continue;
                }

                // 4. Calculate Total Energy Generation for this specific month window
                const aggregation = await EnergyGenerationRecord.aggregate([
                    {
                        $match: {
                            solarUnit: unit._id,
                            timestamp: { $gt: startDate, $lte: targetEndDate }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalEnergy: { $sum: "$energyGenerated" }
                        }
                    }
                ]);

                const totalEnergy = aggregation.length > 0 ? aggregation[0].totalEnergy : 0;
                
                const totalAmount = totalEnergy * ratePerKWh;
                if (totalEnergy <= 0) {
                     console.log(`Skipping unit ${unit.serial_number}: Zero generation recorded.`);
                     continue;
                }

           
                const newInvoice = {
                    solarUnitId: unit._id,
                    clerkUserId: user.clerkUserId,
                    userName: user.userName,
                    billingPeriodStart: startDate,
                    billingPeriodEnd: targetEndDate,
                    totalEnergyGenerated: totalEnergy,
                    amount: totalAmount,
                    paymentStatus: "PENDING",
                };

                await Invoice.create(newInvoice);

                console.log(`Invoice generated for Unit ${unit.serial_number}: ${totalEnergy.toFixed(2)}`);

            } catch (error) {
                console.error(`Error processing unit ${unit.serial_number}:`, error);
            }
        }
        console.log("Invoice Generation Job Completed.");
    } catch (error) {
        console.error("Error in Invoice Generation Job:", error);
    }
}
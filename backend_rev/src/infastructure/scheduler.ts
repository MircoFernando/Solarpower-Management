import cron from 'node-cron';
import { syncEnergyGenerationRecords } from './../application/backgroundJob/sync-energy-energy-record';
import { AnomalyDetection } from '../application/backgroundJob/anomaly/anomoly-detection';
import { generateInvoice } from '../application/backgroundJob/Invoice/generate-invoice';

// 🔒 Lock variable to prevent crashes from overlapping jobs
let isJobRunning = false;

export const initializeScheduler = () => {

  const schedule = process.env.SYNC_CRON_SCHEDULE || '* * * * *'; 
      
  cron.schedule(schedule, async () => {
    
    if (isJobRunning) {
      console.log(`[${new Date().toISOString()}] ⚠️ Previous job still running. Skipping this cycle.`);
      return;
    }


    isJobRunning = true;

    try {
      console.log(`[${new Date().toISOString()}] 🕒 Scheduler triggered. Starting sequential jobs...`);

      // --- JOB 1: SYNC ---
      console.log(`[${new Date().toISOString()}] 🔄 Starting: Energy Generation Sync...`);
      try {
        await syncEnergyGenerationRecords();
        console.log(`[${new Date().toISOString()}] ✅ Completed: Energy Generation Sync`);
      } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ Failed: Energy Generation Sync`, error);
        // Optional: return; // Uncomment if you want to stop the chain on failure
      }

      // --- JOB 2: ANOMALY DETECTION ---
   
      console.log(`[${new Date().toISOString()}] 🔍 Starting: Anomaly Detection...`);
      try {
        await AnomalyDetection();
        console.log(`[${new Date().toISOString()}] ✅ Completed: Anomaly Detection`);
      } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ Failed: Anomaly Detection`, error);
      }

      // --- JOB 3: INVOICES ---
      console.log(`[${new Date().toISOString()}] 💸 Starting: Invoice Generation...`);
      try {
        await generateInvoice();
        console.log(`[${new Date().toISOString()}] ✅ Completed: Invoice Generation`);
      } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ Failed: Invoice Generation`, error);
      }

      console.log(`[${new Date().toISOString()}] 🎉 All scheduled jobs finished.`);

    } catch (criticalError) {
      console.error("Critical Scheduler Error:", criticalError);
    } finally {

      isJobRunning = false;
    }
  });

  console.log(`[Scheduler] Jobs scheduled for: ${schedule}`);
};
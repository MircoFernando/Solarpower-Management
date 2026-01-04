import cron from 'node-cron';
import { syncEnergyGenerationRecords } from './../application/backgroundJob/sync-energy-energy-record';
import { AnomalyDetection } from '../application/backgroundJob/anomaly/anomoly-detection';
import { generateInvoice } from '../application/backgroundJob/Invoice/generate-invoice';
export const initializeScheduler = () => {
  // Run daily at 00:00 (midnight) - cron expression: '0 0 * * *'
  const schedule = process.env.SYNC_CRON_SCHEDULE || '0 0 * * *';
  // const schedule = process.env.SYNC_CRON_SCHEDULE || '* * * * *'; //Run when needed for testing
      
  cron.schedule(schedule, async () => {
    console.log(`[${new Date().toISOString()}] Starting daily energy generation records sync...`);
    console.log(`[${new Date().toISOString()}] Starting daily Anomaly detection...`);
    console.log(`[${new Date().toISOString()}] Starting daily Invoice Generation...`);
    //Syncing Energy Generation Records
    try {
      await syncEnergyGenerationRecords();
      console.log(`[${new Date().toISOString()}] Daily sync completed successfully`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Daily sync failed:`, error);
    }
    //Anomolay Detection 
    try {
      await AnomalyDetection();
      console.log(`[${new Date().toISOString()}] Daily Anomaly Detection completed successfully`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Daily Anomaly Detection failed:`, error);
    }
    //Payment Invoice Generation
    try{
      await generateInvoice();
      console.log(`[${new Date().toISOString()}] Daily Invoice Generation completed successfully`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Daily Invoice Generation failed:`, error);
    }
  });

  console.log(`[Scheduler] Energy generation records sync and Anomaly Detection scheduled for: ${schedule}`);
};


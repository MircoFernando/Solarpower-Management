import cron from 'node-cron';
import { syncEnergyGenerationRecords } from './../application/backgroundJob/sync-energy-energy-record';
import { AnomalyDetection } from '../application/backgroundJob/anomaly/anomoly-detection';
export const initializeScheduler = () => {
  // Run daily at 00:00 (midnight) - cron expression: '0 0 * * *'
  const schedule = process.env.SYNC_CRON_SCHEDULE || '0 0 * * *';
      
  cron.schedule(schedule, async () => {
    console.log(`[${new Date().toISOString()}] Starting daily energy generation records sync...`);
    console.log(`[${new Date().toISOString()}] Starting daily Anomaly detection...`);
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
  });

  console.log(`[Scheduler] Energy generation records sync and Anomaly Detection scheduled for: ${schedule}`);
};
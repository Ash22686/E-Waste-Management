// src/jobs/scheduleScrapUpdate.ts

import cron from 'node-cron';
import Listing from '../models/Listing'; // Adjust path if needed
import mongoose from 'mongoose';

async function updateScrapStatus() {
  if (mongoose.connection.readyState !== 1) {
     return;
  }

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const dateThreshold = thirtyDaysAgo;

    await Listing.updateMany(
      {
        createdAt: { $lt: dateThreshold },
        isScrapItem: false
      },
      {
        $set: { isScrapItem: true }
      }
    );
  } catch (error) {
    console.error('[Scheduler] Error updating scrap status:', error);
  }
}

export const scheduleScrapUpdateJob = () => {
  const schedule = '0 2 * * *'; // Runs daily at 2:00 AM

  cron.schedule(schedule, () => {
      updateScrapStatus();
    }, {
      scheduled: true,
      timezone: "Asia/Kolkata" // Ensure this is your correct production timezone
    }
  );
};
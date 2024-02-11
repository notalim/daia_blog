// utils/scheduler.js
import cron from "node-cron";
import { getAllUsers, updateBloodSugarData } from "../db/userDb.js";

import { getBloodSugarData } from "../services/dexcomHelper.js";

async function updateBloodSugarLevelsForAllUsers() {

    const users = await getAllUsers();
    
    for (const user of users) {
        try {
            const bloodSugarData = await getBloodSugarData(
                user.dexcomSessionId,
                5,
                1
            );
            await updateBloodSugarData(user._id, bloodSugarData);
        } catch (error) {
            console.error(
                `Error fetching blood sugar data for user ${user._id}: ${error}`
            );
        }
    }
}

// This will run the function every 5 minutes
export function startBloodSugarUpdateTask() {
    // This will run the function every 5 minutes
    cron.schedule("*/5 * * * *", updateBloodSugarLevelsForAllUsers, {
        scheduled: true,
        timezone: "America/New_York", // Or your respective timezone
    });
}

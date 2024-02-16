// utils/scheduler.js
import cron from "node-cron";
import { getAllUsers, updateBloodSugarData, updateUserSessionId } from "../db/userDb.js";

import { getBloodSugarData, refreshDexcomSessionId } from "../services/dexcomHelper.js";

const updateBloodSugarLevelsForAllUsers = async () => {
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
                `Error fetching blood sugar data for user ${user._id}, ${user.dexcomUser}: ${error}`
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

const updateDexcomSessionIdForAllUsers = async () => {
    const users = await getAllUsers();
    for (const user of users) {
        try {
            const newSessionId = await refreshDexcomSessionId(user);
            await updateUserSessionId(user._id, newSessionId);
        } catch (error) {
            console.error(
                `Error refreshing Dexcom session ID for user ${user._id}, ${user.dexcomUser}: ${error}`
            );
        }
    }
}

export function startDexcomSessionUpdateTask() {
    // This will run the function every 24 hours
    cron.schedule("0 0 * * *", updateDexcomSessionIdForAllUsers, {
        scheduled: true,
        timezone: "America/New_York", // Or your respective timezone
    });
}


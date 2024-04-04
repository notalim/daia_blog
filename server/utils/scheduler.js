// utils/scheduler.js
import cron from "node-cron";
import {
    getAllUsers,
    updateBloodSugarData,
    updateUserSessionId,
} from "../db/usersModule.js";

import {
    getBloodSugarData,
    refreshDexcomSessionId,
    refreshAllUserSessionIds,
} from "../services/dexcomService.js";
import { checkValues } from "../services/alerts.js";

const updateBloodSugarLevelsForAllUsers = async () => {
    const users = await getAllUsers();

    for (const user of users) {
        try {
            const bloodSugarData = await getBloodSugarData(
                user.dexcomSessionId,
                5,
                1
            );
            await checkValues(user, bloodSugarData[0]);
            await updateBloodSugarData(user._id, bloodSugarData);
        } catch (error) {
            console.error(
                `Error fetching blood sugar data for user ${user._id}, ${user.dexcomUser}: ${error.message}`
            );
            console.log(
                "Trying to refresh Dexcom session ID for this user",
                user._id
            );
            try {
                const newSessionId = await refreshDexcomSessionId(user);
                await updateUserSessionId(user._id, newSessionId);
                console.log(
                    `Successfully refreshed Dexcom session ID for user ${user._id}, ${user.dexcomUser}`
                ); 
            } catch (error) {
                console.error(
                    `Error refreshing Dexcom session ID for user ${user._id}, ${user.dexcomUser}: ${error}`
                );
            }
        }
    }
};

export function startBloodSugarUpdateTask() {
    // This will run the function every 5 minutes
    cron.schedule("*/5 * * * *", updateBloodSugarLevelsForAllUsers, {
        scheduled: true,
        timezone: "America/New_York",
    });
}

export function startDexcomSessionUpdateTask() {
    // This will run the function every 24 hours
    cron.schedule("0 0 * * *", refreshAllUserSessionIds, {
        scheduled: true,
        timezone: "America/New_York", 
    });
}

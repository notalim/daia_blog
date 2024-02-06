import cron from "node-cron";
import { refreshAllUserSessionIds } from "../services/dexcomService.js";

export function startSessionIdRefreshTask() {
    console.log("Starting Dexcom session ID refresh task in 23 hour intervals");
    cron.schedule("0 */23 * * *", async () => {
        console.log("Refreshing Dexcom session IDs for all users");
        await refreshAllUserSessionIds();
    });
}

import { getAllUsers } from "../db/userDb.js";
import { getDexcomSessionId } from "../routes/dexcomHelper.js";
import { updateUserSessionId } from "../db/userDb.js";

async function refreshDexcomSessionId(user) {
  try {
    const newSessionId = await getDexcomSessionId(user.dexcomUser, user.dexcomPass);

    await updateUserSessionId(user._id, newSessionId);
  } catch (error) {
    console.error(`Error refreshing session ID for user ${user._id}:`, error);
  }
}

async function refreshAllUserSessionIds() {
  try {
    const users = await getAllUsers();
    for (const user of users) {
      await refreshDexcomSessionId(user);
    }
    console.log("All session IDs refreshed");
  } catch (error) {
    console.error("Error refreshing all user session IDs:", error);
  }
}

export { refreshAllUserSessionIds };


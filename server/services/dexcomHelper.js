import axios from "axios";
import { errorTypes } from "./errorTypes.js";
import { getAllUsers, updateUserSessionId } from "../db/userDb.js";

const dexcomApiConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

const dexcomApplicationId = "d8665ade-9673-4e27-9ff6-92db4ce13d13";

const handleAxiosError = (error, customMessage) => {
  console.error(`${customMessage}:`, error);
  throw {
    message: customMessage,
    error: errorTypes.DEXCOM_SESSION_PROBLEM,
  };
};

export const getDexcomSessionId = async (dexcomUser, dexcomPass) => {
  const loginUrl = "https://share2.dexcom.com/ShareWebServices/Services/General/LoginPublisherAccountByName";
  const body = {
    accountName: dexcomUser,
    password: dexcomPass,
    applicationId: dexcomApplicationId,
  };

  try {
    const { data } = await axios.post(loginUrl, body, dexcomApiConfig);
    const sessionId = data.replace(/^"|"$/g, "");
    return sessionId;
    } catch (error) {
    handleAxiosError(error, "Error fetching Dexcom session ID");
    }

};

export const getBloodSugarData = async (sessionId, minutes = 60, maxCount = 12) => {
    const url = `https://share2.dexcom.com/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues?sessionId=${sessionId}&minutes=${minutes}&maxCount=${maxCount}`;

    try {
        const { data } = await axios.get(url, dexcomApiConfig);
        return data;
    } catch (error) {
        handleAxiosError(error, "Error fetching blood sugar data");
    }

};

export async function refreshDexcomSessionId(user) {
    try {
        const newSessionId = await getDexcomSessionId(
            user.dexcomUser,
            user.dexcomPass
        );
        await updateUserSessionId(user._id, newSessionId);
    } catch (error) {
        console.error(
            `Error refreshing session ID for user ${user._id}:`,
            error
        );
    }
}

export async function refreshAllUserSessionIds() {
    try {
        const users = await getAllUsers();
        await Promise.all(users.map(refreshDexcomSessionId));
        console.log("All session IDs refreshed");
    } catch (error) {
        console.error("Error refreshing all user session IDs:", error);
    }
}




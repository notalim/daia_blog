import axios from "axios";

import { errorTypes } from "../services/errorTypes.js";

// This function is a helper called in the signup/complete route
// It will also run every 24 hours to refresh the session ID for every!! user

export const getDexcomSessionId = async (dexcomUser, dexcomPass) => {
    console.log("Getting Dexcom session ID")
    const url =
        "https://share2.dexcom.com/ShareWebServices/Services/General/LoginPublisherAccountByName";

    const body = {
        accountName: dexcomUser,
        password: dexcomPass,
        applicationId: "d8665ade-9673-4e27-9ff6-92db4ce13d13",
    };
    
    console.log("Requesting Dexcom session ID", body);

    try {
        const response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.data;
        console.log("Dexcom session ID response:", data)
        const sessionId = data.replace(/^"|"$/g, "");
        console.log("Dexcom session ID:", sessionId);
        return sessionId;
    } catch (error) {
        console.error("Error fetching Dexcom session ID:", error);
        throw {
            message: "Error fetching Dexcom session ID",
            error: errorTypes.DEXCOM_SESSION_PROBLEM,
        };
    }
};

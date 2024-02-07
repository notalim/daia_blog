import axios from "axios";

import { errorTypes } from "../services/errorTypes";

// This function is a helper called in the signup/complete route
// It will also run every 24 hours to refresh the session ID for every!! user

const getDexcomSessionId = async (accountName, password) => {
    const url =
        "https://share2.dexcom.com/ShareWebServices/Services/General/LoginPublisherAccountByName";

    const body = {
        accountName: accountName,
        password: password,
        applicationId: "d8665ade-9673-4e27-9ff6-92db4ce13d13",
    };

    try {
        // axios post request here

        const response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }

        const data = await response.text(); // Use .json() if the API response is in JSON format
        console.log(data);
        const SessionId = data.replace(/^"|"$/g, "");
        // console.log(typeof SessionId);
        return SessionId; // The session ID should be directly in the response body
    } catch (error) {
        console.error("Error fetching Dexcom session ID:", error);
        throw error;
    }
};

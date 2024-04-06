import { sendAlertMessage } from "./twilioService.js";
import { updateCrisis } from "../db/usersModule.js";

const trendDescriptions = {
    Flat: "Stable",
    FortyFiveUp: "Increasing",
    FortyFiveDown: "Decreasing",
    SingleUp: "Slightly Increasing",
    SingleDown: "Slightly Decreasing",
    DoubleUp: "Rapidly Increasing",
    DoubleDown: "Rapidly Decreasing",
    None: "No Data",
};

const composeDetails = (user) => {
    let details = [
        "glucagonType",
        "glucagonLocation",
        "allergies",
        "medications",
        "diagnoses",
    ]
        .filter((detail) => user[detail] !== "")
        .map(
            (detail) =>
                `${detail
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}: ${
                    user[detail]
                }`
        )
        .join(" \n");
    return details;
};

const composeMessage = (user, data, trend, details) => {
    return `${user.crisisText} \n\nBlood Sugar: ${data.Value} mg/dl\nTrend: ${trend} \n${details}`;
};

export const checkValues = async (user, data) => {
    if (!data.Value) {
        console.log(`A point with no value detected, a ghost point will be created for: ${user.name}`);
        return;
    }
    if (
        data.Value < user.lowAlarm &&
        user.lastCrisis < new Date(Date.now() - 900000)
    ) {
        console.log(`Alerting contacts for user ${user.name}`);
        await updateCrisis(user._id);

        const trend = trendDescriptions[data.Trend] || "Unknown";
        const details = composeDetails(user);

        for (let contact of user.contacts) {
            if (contact.active) {
                let message = composeMessage(user, data, trend, details);
                await sendAlertMessage(contact.contactPhoneNumber, message);
            }
        }
    }
};

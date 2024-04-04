import { sendAlertMessage } from './twilioService.js';
import { updateCrisis } from '../db/usersModule.js';

export const checkValues = async (user, data) => {
    // console.log(`Checking values for user ${user.name}`);
    // console.log(data.Value);
    if (data.Value < user.lowAlarm && user.lastCrisis < new Date(Date.now() - 900000)){
        console.log(`Alerting contacts for user ${user.name}`);
        await updateCrisis(user._id);
        for (let contact of user.contacts) {
            if (contact.active) {
                let trend = "";
                if (data.Trend === "Flat") {
                    trend = "Stable";
                } else if (data.Trend === "FortyFiveUp") {
                    trend = "Increasing";
                } else if (data.Trend === "FortyFiveDown"){
                    trend = "Decreasing";
                } else {
                    trend = "Unknown";
                }
                let details = ""
                if (user.glucagonType != "") {
                    details = `Glucagon Type: ${user.glucagonType} \n`;
                }
                if (user.glucagonLocation != "") {
                    details += `Glucagon Location: ${user.glucagonLocation} \n`;
                }
                if (user.allergies != "") {
                    details += `Allergies: ${user.allergies} \n`;
                }
                if (user.medications != "") {
                    details += `Medications: ${user.medications} \n`;
                }
                if (user.diagnoses != "") {
                    details += `Diagnoses: ${user.diagnoses} \n`;
                }
                let value = data.Value;
                let message = `${user.crisisText} \n\nBlood Sugar: ${value} mg/dl\nTrend: ${trend} \n${details}`;
                // console.log(message)
                await sendAlertMessage(contact.contactPhoneNumber, message);
            }
        }
    }
}
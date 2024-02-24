import { sendAlertMessage } from './twilioService.js';
import { updateCrisis } from '../db/usersModule.js';

export const checkValues = async (user, value) => {
    // console.log(`Checking values for user ${user.name}`);
    if (value < user.lowAlarm && user.lastCrisis < new Date(Date.now() - 900000)){
        // console.log(`Alerting contacts for user ${user.name}`);
        await updateCrisis(user._id);
        for (let contact of user.contacts) {
            if (contact.active) {
                await sendAlertMessage(contact.contactPhoneNumber, user.crisisText);
            }
        }
    }
}
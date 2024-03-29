import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const sendVerificationCode = async (to, channel = "sms") => {
    try {
        const verification = await client.verify.v2
            .services(verifySid)
            .verifications.create({ to, channel });
        // console.log("Verification status:", verification.status);
        return verification;
    } catch (error) {
        return { error, message: "Error sending verification code" };
    }
};

const checkVerificationCode = async (to, code) => {
    try {
        const verificationCheck = await client.verify.v2
            .services(verifySid)
            .verificationChecks.create({ to, code });
        // console.log("Verification status:", verificationCheck.status);
        return verificationCheck;
    } catch (error) {
        return { error, message: "Error checking verification code" };
    }
};

const sendAlertMessage = async (to, message) => {
  try {
    const messageSent = await client.messages.create({
      body: message,
      to,
      from: fromPhoneNumber,
    });
    // console.log(messageSent.sid);
    return messageSent;
  } catch (error) {
    throw error;
  }
};

export { sendVerificationCode, checkVerificationCode, sendAlertMessage };

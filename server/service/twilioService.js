import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);

const sendVerificationCode = async (to, channel = "sms") => {
  try {
    const verification = await client.verify.v2.services(verifySid).verifications.create({ to, channel });
    console.log(verification.status);
    return verification;
  } catch (error) {
    throw error;
  }
};

const checkVerificationCode = async (to, code) => {
  try {
    const verificationCheck = await client.verify.v2.services(verifySid).verificationChecks.create({ to, code });
    console.log(verificationCheck.status);
    return verificationCheck;
  } catch (error) {
    throw error;
  }
};

export { sendVerificationCode, checkVerificationCode };

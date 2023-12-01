import express from "express";
import { sendVerificationCode, checkVerificationCode } from "../service/twilioService.js";
const router = express.Router();

router.post("/verify/start", async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const verification = await sendVerificationCode(phoneNumber);
    res.status(200).json({ message: "Verification code sent", verification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/verify/check", async (req, res) => {
  const { phoneNumber, code } = req.body;
  try {
    const verificationCheck = await checkVerificationCode(phoneNumber, code);
    if (verificationCheck.status === "approved") {
      res.status(200).json({ message: "Phone number verified" });
    } else {
      res.status(400).json({ message: "Verification failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

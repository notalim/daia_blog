// routes/users.js
import express from "express";
import { sendVerificationCode, checkVerificationCode } from "../service/twilioService.js";
import { createUser, getUserByPhoneNumber, checkPassword, checkUserByPhoneNumber, addEmergencyContact } from "../db/userDb.js";

import validation from "../db/validation.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    if (!validation.validatePhoneAndPassword(phoneNumber, password)) {
      return res.status(401).send("Invalid phone number or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }

  try {
    const user = await getUserByPhoneNumber(phoneNumber);
    await checkPassword(password, user.password);

    if (!user) {
      return res.status(401).send("User not found");
    }

    res.status(200).send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/signup", async (req, res) => {
  const { phoneNumber, name, dexcomSessionId, password } = req.body;
  try {
    if (!validation.validatePhoneAndPasswordAndName(phoneNumber, password, name)) {
      return res.status(401).send("Invalid phone number, name, or password");
    }

    const user = await checkUserByPhoneNumber(phoneNumber);
    if (user) {
      return res.status(401).send("User already exists");
    }

    // Initiate phone verification
    await sendVerificationCode(phoneNumber);
    res.status(200).send("Verification code sent. Please verify your phone number.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/signup/complete", async (req, res) => {
  const { phoneNumber, code, name, dexcomSessionId, password } = req.body;
  try {
    // Check the verification code
    const verificationCheck = await checkVerificationCode(phoneNumber, code);
    if (verificationCheck.status !== "approved") {
      return res.status(400).send("Invalid or expired code.");
    }

    // Create the user
    await createUser(phoneNumber, name, dexcomSessionId, password);
    res.status(200).send("Signup successful and phone number verified.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/contacts", async (req, res) => {
  const { phoneNumber, contactPhoneNumber, contactName, contactRelationship } = req.body;

  try {
    if (!validation.phoneValidation(contactPhoneNumber)) {
      return res.status(401).send("Invalid emergency contact phone number");
    }

    if (!validation.nameValidation(contactName)) {
      return res.status(401).send("Invalid emergency contact name");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }

  try {
    const user = await getUserByPhoneNumber(phoneNumber);
    if (!user) {
      return res.status(401).send("User not found");
    }

    // Initiate phone verification for the emergency contact
    await sendVerificationCode(contactPhoneNumber);
    res.status(200).send("Verification code sent to emergency contact. Please verify the phone number.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/contacts/verify", async (req, res) => {
  const { phoneNumber, contactPhoneNumber, code, contactName, contactRelationship } = req.body;

  try {
    // Check the verification code for the emergency contact
    const verificationCheck = await checkVerificationCode(contactPhoneNumber, code);
    if (verificationCheck.status !== "approved") {
      return res.status(400).send("Invalid or expired verification code.");
    }

    // Add the verified emergency contact
    const newContact = await addEmergencyContact(phoneNumber, contactPhoneNumber, contactName, contactRelationship);
    res.status(200).send("Emergency contact verified and added successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


router.post("/logout", (req, res) => {
  res.redirect("/");
});

export default router;

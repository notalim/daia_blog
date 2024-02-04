// routes/users.js
import express from "express";
import {
    sendVerificationCode,
    checkVerificationCode,
} from "../services/twilioService.js";
import {
    createUser,
    getUserByPhoneNumber,
    checkPassword,
    checkUserByPhoneNumber,
    addEmergencyContact,
    getDexcomSessionId,
} from "../db/userDb.js";

import validation from "../services/validation.js";

import { errorTypes } from "../services/errorTypes.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { phoneNumber } = req.body;

    if (!validation.phoneValidation(phoneNumber)) {
        return res.status(400).json({
            message: "Invalid phone number format",
            error: errorTypes.INVALID_PHONE_NUMBER,
        });
    }

    try {
        const user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: errorTypes.USER_NOT_FOUND,
            });
        }
        await sendVerificationCode(phoneNumber);
        res.status(200).json({
            message: "Verification code sent. Please verify your phone number.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/login/complete", async (req, res) => {
    const { phoneNumber, code } = req.body;
    try {
        const verificationCheck = await checkVerificationCode(
            phoneNumber,
            code
        );
        if (verificationCheck.status !== "approved") {
            return res.status(400).json({
                message: "Invalid or expired code.",
                error: errorTypes.INVALID_CODE,
            });
        }
        const user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: errorTypes.USER_NOT_FOUND,
            });
        }
        res.status(200).json({
            message: "Login successful and phone number verified.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/signup", async (req, res) => {
    const { phoneNumber } = req.body;
    // console.log(req.body);
    if (!validation.phoneValidation(phoneNumber)) {
        return res.status(400).json({
            message: "Invalid phone number format",
            error: errorTypes.INVALID_PHONE_NUMBER,
        });
    }

    try {
        const userExists = await checkUserByPhoneNumber(phoneNumber);
        if (userExists) {
            return res.status(409).json({
                message: "User already exists",
                error: errorTypes.USER_ALREADY_EXISTS,
            });
        }
        await sendVerificationCode(phoneNumber);
        res.status(200).json({
            message: "Verification code sent. Please verify your phone number.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/signup/complete", async (req, res) => {
    const {
        phoneNumber,
        code,
        name,
        dexcomUser,
        dexcomPass,
        password,
        confirmPassword,
    } = req.body;

    if (!validation.phoneValidation(phoneNumber)) {
        return res.status(400).json({
            message: "Invalid phone number format",
            error: "INVALID_PHONE_NUMBER",
        });
    }
    if (!validation.codeValidation(code)) {
        return res.status(400).json({
            message: "Invalid verification code",
            error: "INVALID_VERIFICATION_CODE",
        });
    }
    if (!validation.nameValidation(name)) {
        return res
            .status(400)
            .json({ message: "Invalid name", error: "INVALID_NAME" });
    }
    if (!validation.passwordValidation(password)) {
        return res.status(400).json({
            message: "Invalid password format",
            error: "INVALID_PASSWORD",
        });
    }
    if (!validation.confirmPasswordValidation(password, confirmPassword)) {
        return res.status(400).json({
            message: "Passwords do not match",
            error: "PASSWORDS_DO_NOT_MATCH",
        });
    }

    try {
        const verificationCheck = await checkVerificationCode(
            phoneNumber,
            code
        );
        if (verificationCheck.status !== "approved") {
            return res.status(400).json({
                message: "Invalid or expired code.",
                error: errorTypes.INVALID_CODE,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }

    let dexcomSessionId;

    try {
        dexcomSessionId = await getDexcomSessionId(dexcomUser, dexcomPass);
        if (!dexcomSessionId) {
            return res.status(401).json({
                message: "Invalid Dexcom credentials",
                error: errorTypes.INVALID_DEXCOM_CREDENTIALS,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
    try {
        await createUser(
            phoneNumber,
            name,
            dexcomUser,
            dexcomPass,
            dexcomSessionId,
            password,
            confirmPassword
        );

        res.status(201).json({
            message: "User created successfully",
            success: true,
            dexcomSessionId: dexcomSessionId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/contacts", async (req, res) => {
    const {
        phoneNumber,
        contactPhoneNumber,
        contactName,
        contactRelationship,
    } = req.body;

    try {
        if (!validation.phoneValidation(contactPhoneNumber)) {
            return res.status(401).send({
                message: "Invalid emergency contact phone number",
                error: errorTypes.INVALID_CONTACT_NUMBER,
            });
        } else if (!validation.nameValidation(contactName)) {
            return res.status(401).send({
                message: "Invalid emergency contact name",
                error: errorTypes.INVALID_CONTACT_NAME,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }

    try {
        const user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(401).send({
                message: "User not found",
                error: errorTypes.USER_NOT_FOUND,
            });
        }

        await sendVerificationCode(contactPhoneNumber);
        res.status(200).send({
            message:
                "Verification code sent. Please verify the emergency contact's phone number.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/contacts/verify", async (req, res) => {
    const {
        phoneNumber,
        contactPhoneNumber,
        code,
        contactName,
        contactRelationship,
    } = req.body;

    try {
        const verificationCheck = await checkVerificationCode(
            contactPhoneNumber,
            code
        );
        if (verificationCheck.status !== "approved") {
            return res.status(400).json({
                message: "Invalid or expired code.",
                error: errorTypes.INVALID_CODE,
            });
        }
        await addEmergencyContact(
            phoneNumber,
            contactPhoneNumber,
            contactName,
            contactRelationship
        );
        res.status(201).json({
            message: "Emergency contact added successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
});

export default router;

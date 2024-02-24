import express from "express";
import {
    sendVerificationCode,
    checkVerificationCode,
} from "../services/twilioService.js";
import {
    addEmergencyContact,
    getUserContacts,
    toggleContactActiveStatus,
    removeEmergencyContact,
} from "../db/contactsModule.js";

import validation from "../services/validation.js";
import { errorTypes } from "../services/errorTypes.js";

const router = express.Router();

router.get("/:userId/contacts", async (req, res) => {
    const userId = req.params.userId;

    try {
        const userContacts = await getUserContacts(userId);
        console.log(userContacts);
        res.status(200).json({
            message: "User contacts retrieved successfully.",
            contacts: userContacts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/:userId/contacts", async (req, res) => {
    const userId = req.params.userId;
    const { phoneNumber, firstName, lastName, relationship } = req.body;

    // Validate input
    if (!validation.phoneValidation(phoneNumber)) {
        return res.status(400).json({
            message: "Invalid phone number format",
            error: errorTypes.INVALID_PHONE_NUMBER,
        });
    }

    if (
        !validation.nameValidation(firstName) ||
        !validation.nameValidation(lastName)
    ) {
        return res.status(400).json({
            message: "Invalid name format",
            error: errorTypes.INVALID_NAME,
        });
    }

    if (!validation.stringValidation(relationship)) {
        return res.status(400).json({
            message: "Invalid relationship format",
            error: errorTypes.INVALID_RELATIONSHIP,
        });
    }

    try {
        const verification = await sendVerificationCode(phoneNumber);

        if (verification.status === "pending") {
            res.status(200).json({
                message:
                    "Verification code sent. Please verify the phone number.",
            });
        } else {
            res.status(500).json({
                message: "Failed to send verification code",
                error: errorTypes.SERVER_ERROR,
            });
        }
    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/:userId/contacts/complete", async (req, res) => {
    const userId = req.params.userId;
    const { phoneNumber, code, firstName, lastName, relationship } = req.body;

    try {
        console.log(phoneNumber, code, firstName, lastName, relationship)
        const verificationCheck = await checkVerificationCode(
            phoneNumber,
            code
        );
        console.log(verificationCheck.status);
        if (verificationCheck.status !== "approved") {
            return res.status(400).json({
                message: "Invalid or expired code.",
                error: errorTypes.INVALID_CODE,
            });
        }

        console.log({
            userId,
            phoneNumber,
            firstName,
            lastName,
            relationship,
        })

        const contact = await addEmergencyContact(
            userId,
            phoneNumber,
            firstName,
            lastName,
            relationship
        );

        res.status(200).json({
            message: "Emergency contact added successfully.",
            contact: contact,
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

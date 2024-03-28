import express from "express";
import {
    sendVerificationCode,
    checkVerificationCode,
} from "../services/twilioService.js";
import {
    addEmergencyContact,
    editEmergencyContact,
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
        // console.log(userContacts);
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

router.patch("/:userId/contacts/:contactId", async (req, res) => {
    const userId = req.params.userId;
    const contactId = req.params.contactId;
    const { phoneNumber, firstName, lastName, relationship } = req.body;

    if (phoneNumber && !validation.phoneValidation(phoneNumber)) {
        return res.status(400).json({
            message: "Invalid phone number format",
            error: errorTypes.INVALID_PHONE_NUMBER,
        });
    }

    if (
        (firstName && !validation.nameValidation(firstName)) ||
        (lastName && !validation.nameValidation(lastName))
    ) {
        return res.status(400).json({
            message: "Invalid name format",
            error: errorTypes.INVALID_NAME,
        });
    }

    if (relationship && !validation.stringValidation(relationship)) {
        return res.status(400).json({
            message: "Invalid relationship format",
            error: errorTypes.INVALID_RELATIONSHIP,
        });
    }

    try {
        const contact = await editEmergencyContact(
            userId,
            contactId,
            phoneNumber,
            firstName,
            lastName,
            relationship
        );

        res.status(200).json({
            message: "Emergency contact updated successfully.",
            contact: contact,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
});

router.post("/:userId/contacts/complete", async (req, res) => {
    const userId = req.params.userId;
    const { phoneNumber, code, firstName, lastName, relationship } = req.body;

    try {
        // console.log(phoneNumber, code, firstName, lastName, relationship)
        const verificationCheck = await checkVerificationCode(
            phoneNumber,
            code
        );
        // console.log(verificationCheck.status);
        if (verificationCheck.status !== "approved") {
            return res.status(400).json({
                message: "Invalid or expired code.",
                error: errorTypes.INVALID_CODE,
            });
        }

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

router.put("/:userId/contacts/:contactId/toggle", async (req, res) => {
    const userId = req.params.userId;
    const contactId = req.params.contactId;

    try {
        const result = await toggleContactActiveStatus(userId, contactId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: error.message || errorTypes.SERVER_ERROR,
        });
    }
});

router.delete("/:userId/contacts/:contactId", async (req, res) => {
    const { userId, contactId } = req.params;

    try {
        const result = await removeEmergencyContact(userId, contactId);
        res.status(201).json({
            message: "Emergency contact removed successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
});

router.patch("/:userId/contacts/:contactId", async (req, res) => {
    const userId = req.params.userId;
    const contactId = req.params.contactId;
    console.log(req.body);
    
    const { firstName, lastName, relationship } = req.body;
    console.log("Editing contact:", contactId, firstName, lastName, relationship);
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
            error: errorTypes.INVALID_CONTACT_RELATIONSHIP,
        });
    }

    try {
        const contact = await editEmergencyContact(
            userId,
            contactId,
            firstName,
            lastName,
            relationship
        );

        res.status(200).json({
            message: "Emergency contact updated successfully.",
            contact,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
});

export default router;

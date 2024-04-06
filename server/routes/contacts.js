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

const validateInput = (validationFunc, data, res, errorCode) => {
    if (!validationFunc(data)) {
        res.status(400).json({ error: errorCode });
        return false;
    }
    return true;
};

router.get("/:userId/contacts", async (req, res) => {
    const userId = req.params.userId;

    try {
        const userContacts = await getUserContacts(userId);
        res.status(200).json({
            contacts: userContacts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/:userId/contacts", async (req, res) => {
    const userId = req.params.userId;
    const { phoneNumber, firstName, lastName, relationship } = req.body;

    if (
        !validateInput(
            validation.phoneValidation,
            phoneNumber,
            res,
            errorTypes.INVALID_PHONE_NUMBER
        )
    ) {
        return;
    }

    if (
        !validateInput(
            validation.nameValidation,
            firstName,
            res,
            errorTypes.INVALID_NAME
        ) ||
        !validateInput(
            validation.nameValidation,
            lastName,
            res,
            errorTypes.INVALID_NAME
        )
    ) {
        return;
    }

    if (
        !validateInput(
            validation.stringValidation,
            relationship,
            res,
            errorTypes.INVALID_RELATIONSHIP
        )
    ) {
        return;
    }

    try {
        const verification = await sendVerificationCode(phoneNumber);

        if (verification.status === "pending") {
            res.status(200).json({});
        } else {
            res.status(500).json({
                error: errorTypes.SERVER_ERROR,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/:userId/contacts/complete", async (req, res) => {
    const userId = req.params.userId;
    const { phoneNumber, code, firstName, lastName, relationship } = req.body;

    try {
        const verificationCheck = await checkVerificationCode(
            phoneNumber,
            code
        );
        if (verificationCheck.status !== "approved") {
            return res.status(400).json({
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
            contact: contact,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
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
            error: error.message || errorTypes.SERVER_ERROR,
        });
    }
});

router.delete("/:userId/contacts/:contactId", async (req, res) => {
    const { userId, contactId } = req.params;

    try {
        await removeEmergencyContact(userId, contactId);
        res.status(201).json({});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
});

router.patch("/:userId/contacts/:contactId", async (req, res) => {
    const userId = req.params.userId;
    const contactId = req.params.contactId;
    const { firstName, lastName, relationship } = req.body;

    if (
        !validateInput(
            validation.nameValidation,
            firstName,
            res,
            errorTypes.INVALID_NAME
        ) ||
        !validateInput(
            validation.nameValidation,
            lastName,
            res,
            errorTypes.INVALID_NAME
        )
    ) {
        return;
    }

    if (
        !validateInput(
            validation.stringValidation,
            relationship,
            res,
            errorTypes.INVALID_CONTACT_RELATIONSHIP
        )
    ) {
        return;
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
            contact,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message || errorTypes.SERVER_ERROR,
        });
    }
});

export default router;

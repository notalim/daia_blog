import express from "express";
import {
    sendVerificationCode,
    checkVerificationCode,
} from "../services/twilioService.js";
import {
    addEmergencyContact,
    toggleContactActiveStatus,
    removeEmergencyContact
} from "../db/contactsModule.js";

import validation from "../services/validation.js";
import { errorTypes } from "../services/errorTypes.js";

router.post("/users/:userId/contacts", async (req, res) => {

});

router.post("/users/:userId/contacts/complete", async (req, res) => {

});
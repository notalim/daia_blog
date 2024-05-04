import express from "express";
import { sendVerificationCode, checkVerificationCode } from "../services/twilioService.js";
import { createUser, getUserByPhoneNumber, deleteUser, updateUserSessionId, updateUser, setLowAlarm, getUserById } from "../db/usersModule.js";
import { getDexcomSessionId, getBloodSugarData } from "../services/dexcomService.js";
import validation from "../services/validation.js";
import { errorTypes } from "../services/errorTypes.js";
import jwt from "jsonwebtoken";
import verifyToken from "./middleware.js";

const router = express.Router();

const validateInput = (validationFunc, data, res, errorCode) => {
    if (!validationFunc(data)) {
        res.status(400).json({ error: errorCode });
        return false;
    }
    return true;
};

// get user by id
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                error: errorTypes.USER_NOT_FOUND,
            });
        }
        if (req.user.userId !== user._id.toString()) {
            return res.status(403).json({
                error: "Access Denied: User ID mismatch",
            });
        }
        // console.log(user);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/login", async (req, res) => {
    const { phoneNumber } = req.body;

    if (!validateInput(validation.phoneValidation, phoneNumber, res, errorTypes.INVALID_PHONE_NUMBER)) {
        return;
    }

    try {
        const user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(404).json({
                error: errorTypes.USER_NOT_FOUND,
            });
        }

        // console.log(phoneNumber);

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

router.post("/login/complete", async (req, res) => {
    const { phoneNumber, code } = req.body;

    if (!validateInput(validation.phoneValidation, phoneNumber, res, errorTypes.INVALID_PHONE_NUMBER)) {
        return;
    }

    if (!validateInput(validation.codeValidation, code, res, errorTypes.INVALID_CODE)) {
        return;
    }

    try {
        const verificationCheck = await checkVerificationCode(phoneNumber, code);
        if (verificationCheck.status !== "approved") {
            return res.status(400).json({
                error: errorTypes.INVALID_CODE,
            });
        }
        const user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(404).json({
                error: errorTypes.USER_NOT_FOUND,
            });
        }
        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Set the token expiration time as needed
        });

        res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/signup", async (req, res) => {
    const { phoneNumber } = req.body;

    if (!validateInput(validation.phoneValidation, phoneNumber, res, errorTypes.INVALID_PHONE_NUMBER)) {
        return;
    }

    try {
        const user = await getUserByPhoneNumber(phoneNumber);
        if (user) {
            return res.status(409).json({
                error: errorTypes.USER_ALREADY_EXISTS,
            });
        }

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

router.post("/signup/complete", async (req, res) => {
    const { phoneNumber, code, name, dexcomUser, dexcomPass } = req.body;

    if (!validateInput(validation.phoneValidation, phoneNumber, res, errorTypes.INVALID_PHONE_NUMBER)) {
        return;
    }

    if (!validateInput(validation.codeValidation, code, res, errorTypes.INVALID_CODE)) {
        return;
    }

    if (!validateInput(validation.nameValidation, name, res, errorTypes.INVALID_NAME)) {
        return;
    }

    try {
        const verificationCheck = await checkVerificationCode(phoneNumber, code);
        if (verificationCheck.status !== "approved") {
            return res.status(400).json({
                error: errorTypes.INVALID_CODE,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: errorTypes.SERVER_ERROR,
        });
    }

    const dexcomSessionId = (await getDexcomSessionId(dexcomUser, dexcomPass)) || null;
    if (dexcomSessionId === "00000000-0000-0000-0000-000000000000") {
        return res.status(401).json({
            error: errorTypes.INVALID_DEXCOM_CREDENTIALS,
        });
    }

    const bloodSugarData = (await getBloodSugarData(dexcomSessionId)) || null;
    if (bloodSugarData === "Invalid session") {
        return res.status(401).json({
            error: errorTypes.DEXCOM_SESSION_PROBLEM,
        });
    }

    try {
        const user = await createUser(phoneNumber, name, dexcomUser, dexcomPass, dexcomSessionId, bloodSugarData);
        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Set the token expiration time as needed
        });

        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/refresh-user", verifyToken, async (req, res) => {
    const { phoneNumber } = req.body;
    if (!validateInput(validation.phoneValidation, phoneNumber, res, errorTypes.INVALID_PHONE_NUMBER)) {
        return;
    }

    try {
        const user = await getUserByPhoneNumber(phoneNumber);
        // console.log(user);
        if (!user) {
            return res.status(404).json({
                error: errorTypes.USER_NOT_FOUND,
            });
        }

        if (req.user.userId !== user._id.toString()) {
            return res.status(403).json({
                error: "Access Denied: User ID mismatch",
            });
        }

        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Set the token expiration time as needed
        });

        return res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.patch("/update", verifyToken, async (req, res) => {
    const { phoneNumber, name, glucagonLocation, glucagonType, allergies, medications, diagnoses, crisisText } = req.body;
    try {
        let user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(404).json({
                error: errorTypes.USER_NOT_FOUND,
            });
        }

        if (req.user.userId !== user._id.toString()) {
            return res.status(403).json({
                error: "Access Denied: User ID mismatch",
            });
        }

        const validations = [
            {
                func: validation.nameValidation,
                data: name,
                error: errorTypes.INVALID_NAME,
            },
            {
                func: validation.glucagonLocationValidation,
                data: glucagonLocation,
                error: errorTypes.INVALID_GLUCAGON_LOCATION,
            },
            {
                func: validation.glucagonTypeValidation,
                data: glucagonType,
                error: errorTypes.INVALID_GLUCAGON_TYPE,
            },
            {
                func: validation.allergiesValidation,
                data: allergies,
                error: errorTypes.INVALID_ALLERGIES,
            },
            {
                func: validation.medicationsValidation,
                data: medications,
                error: errorTypes.INVALID_MEDICATIONS,
            },
            {
                func: validation.diagnosesValidation,
                data: diagnoses,
                error: errorTypes.INVALID_DIAGNOSES,
            },
            {
                func: validation.crisisTextValidation,
                data: crisisText,
                error: errorTypes.INVALID_CRISIS_TEXT,
            },
        ];

        for (let { func, data, error } of validations) {
            if (!validateInput(func, data, res, error)) return;
        }

        const updateData = {
            name,
            glucagonLocation,
            glucagonType,
            allergies,
            medications,
            diagnoses,
            crisisText,
        };
        const updated = await updateUser(user._id, updateData);
        if (updated === false) {
            return res.status(400).json({
                error: errorTypes.NO_FIELDS_UPDATED,
            });
        }

        user = await getUserByPhoneNumber(phoneNumber);
        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Set the token expiration time as needed
        });

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/update-dexcom", verifyToken, async (req, res) => {
    const { phoneNumber, dexcomUser, dexcomPass } = req.body;

    if (!validateInput(validation.phoneValidation, phoneNumber, res, errorTypes.INVALID_PHONE_NUMBER)) {
        return;
    }

    let foundUserId = null;

    try {
        const foundUser = await getUserByPhoneNumber(phoneNumber);
        foundUserId = foundUser._id;
        if (!foundUser) {
            return res.status(404).json({
                error: errorTypes.USER_NOT_FOUND,
            });
        }
        console.log(foundUser._id);
        console.log(req.user.userId);
        if (req.user.userId !== foundUser._id.toString()) {
            return res.status(403).json({
                error: "Access Denied: User ID mismatch",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: errorTypes.SERVER_ERROR,
        });
    }

    try {
        const newDexcomSessionId = (await getDexcomSessionId(dexcomUser, dexcomPass)) || null;

        if (newDexcomSessionId === "00000000-0000-0000-0000-000000000000") {
            return res.status(401).json({
                error: errorTypes.INVALID_DEXCOM_CREDENTIALS,
            });
        }

        const user = await updateUserSessionId(foundUserId, newDexcomSessionId);

        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Set the token expiration time as needed
        });

        res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/update-alarm", verifyToken, async (req, res) => {
    const { phoneNumber, lowAlarm } = req.body;

    if (!validateInput(validation.phoneValidation, phoneNumber, res, errorTypes.INVALID_PHONE_NUMBER)) {
        return;
    }

    if (typeof lowAlarm !== "number" || lowAlarm < 0 || lowAlarm > 200) {
        return res.status(400).json({
            error: "INVALID_LOW_ALARM",
        });
    }

    try {
        let user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(404).json({
                error: errorTypes.USER_NOT_FOUND,
            });
        }
        if (req.user.userId !== user._id.toString()) {
            return res.status(403).json({
                error: "Access Denied: User ID mismatch",
            });
        }
        user = await setLowAlarm(user._id, lowAlarm);
        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Set the token expiration time as needed
        });

        res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: errorTypes.SERVER_ERROR,
        });
    }
});

export default router;

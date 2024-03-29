import express from "express";
import {
    sendVerificationCode,
    checkVerificationCode,
} from "../services/twilioService.js";
import {
    createUser,
    getUserByPhoneNumber,
    deleteUser,
    updateUserSessionId,
    updateUser,
    setLowAlarm,
} from "../db/usersModule.js";

import {
    getDexcomSessionId,
    getBloodSugarData,
    refreshDexcomSessionId,
} from "../services/dexcomHelper.js";

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

        console.log(phoneNumber);

        const verification = await sendVerificationCode(phoneNumber);

        if (verification.status === "pending") {
            res.status(200).json({
                message:
                    "Verification code sent. Please verify your phone number.",
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

router.post("/login/complete", async (req, res) => {
    const { phoneNumber, code } = req.body;
    try {
        const verificationCheck = await checkVerificationCode(
            phoneNumber,
            code
        );
        // console.log("verification status at login: ", verificationCheck.status);
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
            user: user,
            dexcomSessionId: user.dexcomSessionId,
            message: "User logged in successfully",
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
        const user = await getUserByPhoneNumber(phoneNumber);
        if (user) {
            return res.status(409).json({
                message: "User already exists",
                error: errorTypes.USER_ALREADY_EXISTS,
            });
        }

        const verification = await sendVerificationCode(phoneNumber);

        if (verification.status === "pending") {
            res.status(200).json({
                message:
                    "Verification code sent. Please verify your phone number.",
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

router.post("/signup/complete", async (req, res) => {
    const { phoneNumber, code, name, dexcomUser, dexcomPass } = req.body;

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

    const dexcomSessionId =
        (await getDexcomSessionId(dexcomUser, dexcomPass)) || null;
    if (dexcomSessionId === "00000000-0000-0000-0000-000000000000") {
        return res.status(401).json({
            message: "Invalid Dexcom credentials",
            error: errorTypes.INVALID_DEXCOM_CREDENTIALS,
        });
    }

    const bloodSugarData = (await getBloodSugarData(dexcomSessionId)) || null;
    if (bloodSugarData === "Invalid session") {
        return res.status(401).json({
            message: "Problem with Dexcom session",
            error: errorTypes.DEXCOM_SESSION_PROBLEM,
        });
    }

    try {
        const user = await createUser(
            phoneNumber,
            name,
            dexcomUser,
            dexcomPass,
            dexcomSessionId,
            bloodSugarData
        );

        res.status(201).json({
            user: user,
            message: "User created and logged in successfully",
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

router.post("/refresh-user", async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const updatedUser = await getUserByPhoneNumber(phoneNumber);
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                error: errorTypes.USER_NOT_FOUND,
            });
        }

        return res.status(200).json({
            message: "Blood sugar data refreshed",
            user: updatedUser,
        });
    } catch (error) {   
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.patch("/update", async (req, res) => {
    const {
        phoneNumber,
        name,
        glucagonLocation,
        glucagonType,
        crisisText,
        emergencyInfo,
    } = req.body;
    // ! Not working, place holder code
    try {
        const user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: errorTypes.USER_NOT_FOUND,
            });
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (glucagonLocation) updateData.glucagonLocation = glucagonLocation;
        if (glucagonType) updateData.glucagonType = glucagonType;
        if (crisisText) updateData.crisisText = crisisText;
        if (emergencyInfo) updateData.emergencyInfo = emergencyInfo;

        const updated = await updateUser(user._id, updateData);
        if (!updated) {
            return res.status(400).json({
                message: "User update failed",
                error: "UPDATE_FAILED",
            });
        }
        const updatedUser = await getUserByPhoneNumber(phoneNumber);
        res.status(200).json({
            user: updatedUser,
            message: "User updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/update-phone", async (req, res) => {
    const { phoneNumber, newPhoneNumber } = req.body;

    if (!validation.phoneValidation(phoneNumber)) {
        return res.status(400).json({
            message: "Invalid phone number format",
            error: errorTypes.INVALID_PHONE_NUMBER,
        });
    }

    if (!validation.phoneValidation(newPhoneNumber)) {
        return res.status(400).json({
            message: "Invalid new phone number format",
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
        const updatedUser = await getUserByPhoneNumber(newPhoneNumber);
        if (updatedUser) {
            return res.status(409).json({
                message: "User already exists",
                error: errorTypes.USER_ALREADY_EXISTS,
            });
        }

        await sendVerificationCode(newPhoneNumber);

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

router.post("/update-phone/complete", async (req, res) => {
    const { phoneNumber, newPhoneNumber, code } = req.body;

    if (!validation.codeValidation(code)) {
        return res.status(400).json({
            message: "Invalid verification code",
            error: "INVALID_VERIFICATION_CODE",
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

    try {
        const user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: errorTypes.USER_NOT_FOUND,
            });
        }
        const updateData = {};
        if (newPhoneNumber) updateData.phoneNumber = newPhoneNumber;
        const updated = await updateUser(user._id, updateData);
        if (!updated) {
            return res.status(400).json({
                message: "User update failed",
                error: "UPDATE_FAILED",
            });
        }
        const updatedUser = await getUserByPhoneNumber(phoneNumber);
        res.status(200).json({
            user: updatedUser,
            message: "User updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }

    try {
        const user = await updateUser(
            phoneNumber,
            name,
            dexcomUser,
            dexcomPass,
            dexcomSessionId,
            bloodSugarData
        );

        res.status(201).json({
            user: user,
            message: "User created and logged in successfully",
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

router.post("/update-dexcom", async (req, res) => {
    const { phoneNumber, dexcomUser, dexcomPass } = req.body;

    const newDexcomSessionId =
        (await getDexcomSessionId(dexcomUser, dexcomPass)) || null;

    if (newDexcomSessionId === "00000000-0000-0000-0000-000000000000") {
        return res.status(401).json({
            message: "Invalid Dexcom credentials",
            error: errorTypes.INVALID_DEXCOM_CREDENTIALS,
        });
    }

    let foundUserId = null;

    try {
        const foundUser = await getUserByPhoneNumber(phoneNumber);
        foundUserId = foundUser._id;
        if (!foundUser) {
            return res.status(404).json({
                message: "User not found",
                error: errorTypes.USER_NOT_FOUND,
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
        const foundUser = await getUserByPhoneNumber(phoneNumber);
        foundUserId = foundUser._id;
        if (!foundUser) {
            return res.status(404).json({
                message: "User not found",
                error: errorTypes.USER_NOT_FOUND,
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
        const updatedUser = await updateUserSessionId(
            foundUserId,
            newDexcomSessionId
        );
        res.status(200).json({
            user: updatedUser,
            message: "Dexcom credentials updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
    try {
        const updatedUser = await updateUserSessionId(
            foundUserId,
            newDexcomSessionId
        );
        res.status(200).json({
            user: updatedUser,
            message: "Dexcom credentials updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.post("/update-alarm", async (req, res) => {
    const { phoneNumber, lowAlarm } = req.body;

    try {
        const user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: errorTypes.USER_NOT_FOUND,
            });
        }

        if (typeof lowAlarm !== "number" || lowAlarm < 0 || lowAlarm > 200) {
            return res.status(400).json({
                message: "Invalid low alarm value",
                error: "INVALID_LOW_ALARM",
            });
        }

        const updatedUser = await setLowAlarm(user._id, lowAlarm);
        res.status(200).json({
            user: updatedUser,
            message: "Low alarm updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: errorTypes.SERVER_ERROR,
        });
    }
});

router.delete("/delete/:phoneNumber", async (req, res) => {
    const { phoneNumber } = req.params;

    try {
        const user = await getUserByPhoneNumber(phoneNumber);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: errorTypes.USER_NOT_FOUND,
            });
        }
        await deleteUser(phoneNumber);
        res.status(200).json({
            message: "User deleted successfully",
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

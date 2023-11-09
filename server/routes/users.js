// routes/users.js
import express from "express";
import {
    createUser,
    getUserByPhoneNumber,
    checkPassword,
} from "../db/userDb.js";

import validation from "../db/validation.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {

        const user = await getUserByPhoneNumber(phoneNumber);
        await checkPassword(password, user.password);

        if (!user) {
            return res.status(401).send('User not found');
        }

        res.status(200).send('Login successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.post("/signup", async (req, res) => {
    const { phoneNumber, name, dexcomSessionId, password } = req.body;

    try {
        const user = await getUserByPhoneNumber(phoneNumber);
        if (user) {
            return res.status(401).send('User already exists');
        }

        const newUser = await createUser(phoneNumber, name, dexcomSessionId, password);

        res.status(200).send('Signup successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.post("/logout", (req, res) => {
    res.redirect("/");
});

export default router;


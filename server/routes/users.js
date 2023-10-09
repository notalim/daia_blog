// routes/users.js
import express from "express";
import {
    createUser,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser,
} from "../db/userDb.js";

import validation from "../db/validation.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Handle login form submission
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Validate inputs
    if (!validation.usernameValidation(username) || !validation.passwordValidation(password)) {
        return res.status(400).send('Invalid input');
    }

    try {

        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(401).send('User not found');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send('Incorrect password');
        }

        res.status(200).send('Login successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Handle logout
router.post("/logout", (req, res) => {
    
    res.redirect("/");
});

export default router;


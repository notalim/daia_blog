// server/db/userDb.js
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";

import validation from "../utils/validation.js";
import { ObjectId } from "mongodb";

const saltRounds = 10; 

const createUser = async (phoneNumber, name, dexcomSessionId, password) => {
    try {

        password = validation.passwordValidation(password);

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            phoneNumber,
            name,
            dexcomSessionId,
            password: hashedPassword,
            userId: new ObjectId(),
            contacts: [],
            activeSession: false,
            activeCrisis: false,
            lastCrisis: null,
            activeContacts: [],
            activateCrisisText: "",
            disableCrisisText: "",
            emergencyInfo: null,
            crisisTexts: [],
            userRole: "user"
        };

        const userCollection = await users();
        const insertInfo = await userCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0)
            throw new Error("Could not add user!");

        return newUser;
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
};

const getUserByPhoneNumber = async (phoneNumber) => {
    try {
        
        const userCollection = await users();
        let foundUser = await userCollection.findOne({ phoneNumber });

        if (!foundUser) {
            throw new Error("User not found");
        }

        return foundUser;
    } catch (error) {
        throw new Error("Error fetching user: " + error.message);
    }
};

const checkPassword = async (phoneNumber, password) => {
    try {

        let foundUser = getUserByPhoneNumber(phoneNumber);
        return bcrypt.compare(password, foundUser.password);
            
    } catch (error) {
        throw new Error("Error checking password: " + error.message);
    }
}

export { createUser, getUserByPhoneNumber, checkPassword };

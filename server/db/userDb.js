// server/db/userDb.js
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
import validation from "../services/validation.js";
import { ObjectId } from "mongodb";
dotenv.config();
const saltRounds = 10;

// const algorithm = "aes-256-ctr";
// const secretKey = process.env.ENCRYPTION_SECRET_KEY;
// const iv = crypto.randomBytes(16); // Initialization vector

// const encrypt = (text) => {
//   const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
//   const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
//   return {
//     iv: iv.toString("hex"),
//     content: encrypted.toString("hex"),
//   };
// };

// const decrypt = (hash) => {
//   const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, "hex"));
//   const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, "hex")), decipher.final()]);
//   return decrpyted.toString();
// };

const createUser = async (
    phoneNumber,
    name,
    dexcomUser,
    dexcomPass,
    dexcomSessionId,
    bloodSugarData
) => {
    try {
        // ! Validate args here

        const hashedDexcomPass = dexcomPass;

        const newUser = {
            phoneNumber,
            name,
            dexcomSessionId,
            dexcomUser,
            dexcomPass: hashedDexcomPass,

            // Dexcom Blood Sugar Data
            bloodSugarData: bloodSugarData,
            // Our data
            contacts: [],
            glucagonLocation: "",
            glucagonType: "",
            activeSession: false,
            activeCrisis: false,
            lastCrisis: null,
            crisisTextEnabled: true,
            crisisText: `${name} has low blood sugar and needs help! Please call ${name} at ${phoneNumber} to help!`,
            emergencyInfo: null,
            userRole: "user",
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

        return foundUser;
    } catch (error) {
        throw new Error("Error trying to get an existing user: " + error.message);
    }
};


const checkPassword = async (phoneNumber, password) => {
    try {
        if (
            !validation.validatePhoneAndPassword(
                phoneNumber,
                password,
                confirmPassword
            )
        ) {
            throw new Error("Invalid phone number or password");
        }

        let foundUser = getUserByPhoneNumber(phoneNumber);
        return bcrypt.compare(password, foundUser.password);
    } catch (error) {
        throw new Error("Error checking password: " + error.message);
    }
};

const addEmergencyContact = async (
    phoneNumber,
    contactPhoneNumber,
    contactName,
    contactRelationship
) => {
    try {
        if (!validation.phoneValidation(contactPhoneNumber)) {
            throw new Error("Invalid emergency contact phone number");
        }

        if (!validation.nameValidation(contactName)) {
            throw new Error("Invalid emergency contact name");
        }

        const contact = {
            contactPhoneNumber,
            contactName,
            contactRelationship,
            active: true,
        };

        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
            { phoneNumber },
            { $push: { contacts: contact } }
        );
        if (updateInfo.modifiedCount === 0)
            throw new Error("Could not add emergency contact!");

        return true;
    } catch (error) {
        throw new Error("Error adding emergency contact: " + error.message);
    }
};

const getAllUsers = async () => {
    try {
        const userCollection = await users();
        let userList = await userCollection.find({}).toArray();

        if (!userList) throw "Could not get all users";

        // console.log(userList);
        return userList;
    } catch (error) {
        throw new Error("Error fetching all users: " + error.message);
    }
};

const updateUserSessionId = async (userId, dexcomSessionId) => {
    try {
        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
            { _id: userId },
            { $set: { dexcomSessionId } }
        );
        if (updateInfo.modifiedCount === 0)
            throw new Error("Could not update user session ID!");

        return true;
    } catch (error) {
        throw new Error("Error updating user session ID: " + error.message);
    }
};

const updateBloodSugarData = async (userId, addedBloodSugarData) => {
    try {
        if (Array.isArray(addedBloodSugarData)) {
            addedBloodSugarData = addedBloodSugarData[0];
        }
        const userCollection = await users(); // Assuming `users()` gets the collection
        const updateInfo = await userCollection.updateOne(
            { _id: userId },
            {
                $push: {
                    bloodSugarData: addedBloodSugarData,
                },
            }
        );

        if (updateInfo.modifiedCount === 0)
            throw new Error("Could not update blood sugar data!");

        return updateInfo.modifiedCount === 1;
    } catch (error) {
        throw new Error("Error updating blood sugar data: " + error.message);
    }
};

export {
    createUser,
    getUserByPhoneNumber,
    checkPassword,
    addEmergencyContact,
    getAllUsers,
    updateUserSessionId,
    updateBloodSugarData,
};

// server/db/userDb.js
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";

import validation from "../db/validation.js";
import { ObjectId } from "mongodb";

const saltRounds = 10; 

const createUser = async (phoneNumber, name, dexcomSessionId, password) => {

    try {
        if (!validation.validatePhoneAndPasswordAndName(phoneNumber, password, name)) {
            throw new Error("Invalid phone number or password or name");
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            phoneNumber,
            name,
            dexcomSessionId,
            password: hashedPassword,
            userId: new ObjectId(),
            contacts: [],
            glucagonLocation: "",
            glucagonType: "",
            activeSession: false,
            activeCrisis: false,
            lastCrisis: null,
            crisisTextEnabled: true,
            crisisText: `${name} has low blood sugar and needs help! Please call ${name} at ${phoneNumber} to help!`,
            emergencyInfo: null,
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

const checkUserByPhoneNumber = async (phoneNumber) => {
  try {
    const userCollection = await users();
    let foundUser = await userCollection.findOne({ phoneNumber });

    return foundUser;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

const checkPassword = async (phoneNumber, password) => {

    try {
        if (!validation.validatePhoneAndPassword(phoneNumber, password)) {
            throw new Error("Invalid phone number or password");
        }

        let foundUser = getUserByPhoneNumber(phoneNumber);
        return bcrypt.compare(password, foundUser.password);
            
    } catch (error) {
        throw new Error("Error checking password: " + error.message);
    }
}

const addEmergencyContact = async (phoneNumber, contactPhoneNumber, contactName, contactRelationship) => {

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
            active: true
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
}

// const modifyUser = async (phoneNumber, ) {
//     // should be able to modify:
//     // glucagonType, 
//     // glucagonLocation, 
//     // crisisTextEnabled
//     // crisisText
// }

export { createUser, getUserByPhoneNumber, checkUserByPhoneNumber, checkPassword, addEmergencyContact};

// server/db/userDb.js
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import validation from "../services/validation.js";
import { ObjectId } from "mongodb";
dotenv.config();
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_SECRET_KEY;
const key = crypto.createHash("sha256").update(String(secretKey)).digest("base64").substr(0, 32);

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(hash.iv, "hex"));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, "hex")), decipher.final()]);

  return decrypted.toString();
};

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

        const encryptedDexcomPass = encrypt(dexcomPass);

        const newUser = {
          phoneNumber,
          name,
          dexcomSessionId,
          dexcomUser,
          dexcomPass: encryptedDexcomPass,

          // Dexcom Blood Sugar Data
          bloodSugarData: bloodSugarData,
          // Our data
          contacts: [],
          lowAlarm: 70,
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

const updateUser = async (id, updatedUser) => {
    // ! Validate args here
    console.log(updatedUser);
    console.log(id);
    try {
        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
            { _id: id },
            { $set: updatedUser }
        );
        if (updateInfo.modifiedCount === 0)
            throw new Error("Could not update user!");

        return true;
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
};

const getUserByPhoneNumber = async (phoneNumber) => {
    try {
        const userCollection = await users();
        let foundUser = await userCollection.findOne({ phoneNumber });

        return foundUser;
    } catch (error) {
        throw new Error(
            "Error trying to get an existing user: " + error.message
        );
    }
};

const getUserById = async (userId) => {
    try {
        const userCollection = await users();
        let foundUser = await userCollection.findOne({
            _id: new ObjectId(userId),
        });

        return foundUser;
    } catch (error) {
        throw new Error(
            "Error trying to get an existing user: " + error.message
        );
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
        if (!Array.isArray(addedBloodSugarData)) {
            addedBloodSugarData = [addedBloodSugarData];
        }

        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
            { _id: userId },
            {
                $push: {
                    bloodSugarData: {
                        $each: addedBloodSugarData,
                        $slice: -288,
                    },
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

const deleteUser = async (phoneNumber) => {
    try {
        const userCollection = await users();
        const deleteInfo = await userCollection.deleteOne({ phoneNumber });
        if (deleteInfo.deletedCount === 0)
            throw new Error("Could not delete user!");

        return true;
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
};

const updateCrisis = async (userId) => {
    try {
        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
            { _id: userId },
            {
                $set: {
                    lastCrisis: new Date(),
                },
            }
        );

        if (updateInfo.modifiedCount === 0)
            throw new Error("Could not update crisis status!");

        return true;
    } catch (error) {
        throw new Error("Error updating crisis status: " + error.message);
    }
};

const setLowAlarm = async (userId, lowAlarm) => {
    // * Threshold in the frontend
    try {
        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
            { _id: userId },
            {
                $set: {
                    lowAlarm,
                },
            }
        );

        if (updateInfo.modifiedCount === 0)
            throw new Error("Could not update low alarm!");

        const updatedUser = await userCollection.findOne({ _id: userId });

        return updatedUser;
    } catch (error) {
        throw new Error("Error updating low alarm: " + error.message);
    }
};

export {
    createUser,
    getUserByPhoneNumber,
    getUserById,
    checkPassword,
    getAllUsers,
    updateUserSessionId,
    updateBloodSugarData,
    deleteUser,
    updateUser,
    updateCrisis,
    setLowAlarm,
    decrypt
};

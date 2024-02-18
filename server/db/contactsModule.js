import { users } from "../config/mongoCollections.js";
import dotenv from "dotenv";
import validation from "../services/validation.js";
import { errorTypes } from "../services/errorTypes.js";

dotenv.config();

export const addEmergencyContact = async (
    userId,
    contactPhoneNumber,
    contactFirstName,
    contactLastName,
    contactRelationship
) => {
    try {
        if (!validation.phoneValidation(contactPhoneNumber)) {
            throw new Error(errorTypes.INVALID_CONTACT_NUMBER);
        }
        if (
            !validation.nameValidation(contactFirstName) ||
            !validation.nameValidation(contactLastName)
        ) {
            throw new Error(errorTypes.INVALID_CONTACT_NAME);
        }

        const contact = {
            contactFirstName,
            contactLastName,
            contactPhoneNumber,
            contactRelationship,
            active: true,
        };

        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
            { _id: userId },
            { $addToSet: { contacts: contact } } // Use $addToSet to avoid duplicates
        );

        if (!updateInfo.matchedCount || !updateInfo.modifiedCount) {
            throw new Error(errorTypes.CONTACT_NOT_ADDED);
        }

        return { message: "Emergency contact added successfully." };
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

export const toggleContactActiveStatus = async (
    userId,
    contactId,
    activeStatus
) => {
    try {
        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
            { _id: userId, "contacts._id": contactId },
            { $set: { "contacts.$.active": activeStatus } }
        );

        if (!updateInfo.matchedCount || !updateInfo.modifiedCount) {
            throw new Error(errorTypes.CONTACT_STATUS_NOT_UPDATED);
        }

        return { message: "Contact active status updated successfully." };
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

export const removeEmergencyContact = async (userId, contactId) => {
    try {
        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
            { _id: userId },
            { $pull: { contacts: { _id: contactId } } }
        );

        if (!updateInfo.matchedCount || !updateInfo.modifiedCount) {
            throw new Error(errorTypes.CONTACT_NOT_REMOVED);
        }

        return { message: "Emergency contact removed successfully." };
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

export const getEmergencyContacts = async (userId) => {
    try {
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: userId });
        if (!user) {
            throw new Error(errorTypes.USER_NOT_FOUND);
        }

        return user.contacts;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};


import { users } from "../config/mongoCollections.js";
import dotenv from "dotenv";
import validation from "../services/validation.js";
import { errorTypes } from "../services/errorTypes.js";

import { getUserById } from "./usersModule.js";
import { ObjectId } from "mongodb";

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
            _id: new ObjectId(),
            contactFirstName,
            contactLastName,
            contactPhoneNumber,
            contactRelationship,
            active: true,
        };

        const userCollection = await users();

        const userDoc = await userCollection.findOne({
            _id: new ObjectId(userId),
        });

        if (
            userDoc.contacts.some(
                (contact) => contact.contactPhoneNumber === contactPhoneNumber
            )
        ) {
            throw new Error(errorTypes.CONTACT_ALREADY_EXISTS);
        }
        const updateInfo = await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $addToSet: { contacts: contact } }
        );

        if (updateInfo.matchedCount === 0) {
            throw new Error(errorTypes.USER_NOT_FOUND);
        }

        if (updateInfo.modifiedCount === 0) {
            throw new Error(errorTypes.CONTACT_ALREADY_EXISTS);
        }

        return { message: "Emergency contact added successfully." };
    } catch (error) {
        console.error("Failed to add emergency contact:", error.message);
        throw new Error(error.message || errorTypes.SERVER_ERROR);
    }
};

export const toggleContactActiveStatus = async (userId, contactId) => {
    try {
        const userCollection = await users();
        const user = await userCollection.findOne({
            _id: new ObjectId(userId),
        });
        if (!user) {
            throw new Error(errorTypes.USER_NOT_FOUND);
        }
        const contact = user.contacts.find((c) => c._id === new ObjectId(contactId));
        if (!contact) {
            throw new Error(errorTypes.CONTACT_NOT_FOUND);
        }

        const newActiveStatus = !contact.active;

        const updateInfo = await userCollection.updateOne(
            { _id: new ObjectId(userId), "contacts._id": new ObjectId(contactId) },
            { $set: { "contacts.$.active": newActiveStatus } }
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

export const getUserContacts = async (userId) => {
    try {
        const user = await getUserById(userId);

        if (!user.contacts) {
            throw new Error(errorTypes.CONTACTS_NOT_FOUND);
        }

        return user.contacts;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

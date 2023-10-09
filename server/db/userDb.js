// server/db/userDb.js
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";

import validation from "../utils/validation.js";
import { ObjectId } from "mongodb";

const saltRounds = 10; // Define the number of salt rounds

const createUser = async (username, password, avatarUrl = "") => {
    try {
        if (!validation.usernameValidation(username)) {
            throw new Error("Invalid username");
        }

        if (!validation.passwordValidation(password)) {
            throw new Error("Invalid password");
        }

        // if (!validation.avatarUrlValidation(avatarUrl)) {
        //     throw new Error("Invalid avatar URL");
        // }

        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password

        const newUser = {
            _id: new ObjectId(),
            username,
            password: hashedPassword,
            avatarUrl,
        };

        const userCollection = await users();
        const insertInfo = await userCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0)
            throw new Error("Could not add user");

        return newUser;
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
};

const getUserById = async (userId) => {
    try {
        const userCollection = await users();

        const user = await userCollection.findOne({ _id: ObjectId(userId) });

        if (!user) throw new Error("User not found");

        return user;
    } catch (error) {
        throw new Error("Error fetching user: " + error.message);
    }
};

const getUserByUsername = async (username) => {
    try {
        if (!validation.usernameValidation(username)) {
            throw new Error("Invalid username");
        }

        const userCollection = await users();

        const user = await userCollection.findOne({ username });

        if (!user) throw new Error("User not found");

        return user;
    } catch (error) {
        throw new Error("Error fetching user: " + error.message);
    }
}

const updateUser = async (username, updatedInfo) => {
    try {
        if (!validation.usernameValidation(username)) {
            throw new Error("Invalid username");
        }

        const userCollection = await users();

        const updatedUser = await userCollection.findOneAndUpdate(
            { username },
            { $set: updatedInfo },
            { returnOriginal: false }
        );

        if (!updatedUser.value) throw new Error("Could not update user");

        return updatedUser;
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
};

const deleteUser = async (userId, password) => {
    try {
        const userCollection = await users();

        const user = await userCollection.findOne({ _id: ObjectId(userId) });

        if (!user) throw new Error("User not found");

        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error("Incorrect password");
        }

        const deleteInfo = await userCollection.deleteOne({ _id: ObjectId(userId) });
        if (deleteInfo.deletedCount === 0)
            throw new Error("Could not delete user");

        return { userId, deleted: true };
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
};

export { createUser, getUserById, getUserByUsername, updateUser, deleteUser };

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/apiClient";
import { errorTypes } from "../services/errorTypes";
import { useToast } from "@src/@/components/ui/use-toast";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

import useProcessMessages from "./useProcessMessages";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const navigate = useNavigate();

    const { processError, processSuccess } = useProcessMessages();

    const loginUser = async (phoneNumber) => {
        try {
            const { data, error } = await API.login(phoneNumber);
            if (error) {
                processError(error);
                return { data: null, error };
            }
            processSuccess("Verification code sent.");
            return { data, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error };
        }
    };

    const completeLogin = async (phoneNumber, code) => {
        try {
            const { data, error } = await API.completeLogin(phoneNumber, code);
            if (error) {
                processError(error);
                return { data: null, error };
            }
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            processSuccess("Logged in successfully.");
            return { data, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error };
        }
    };

    const registerUser = async (phoneNumber) => {
        try {
            const { data, error } = await API.registerUser(phoneNumber);
            if (error) {
                processError(error);
                return { data: null, error };
            }
            processSuccess("Verification code sent.");
            return { data, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error };
        }
    };

    const completeRegistration = async (phoneNumber, code, name, dexcomUser, dexcomPass) => {
        try {
            const { data, error } = await API.completeRegistration(phoneNumber, code, name, dexcomUser, dexcomPass);
            if (error) {
                processError(error);
                return { data: null, error };
            }
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            processSuccess("Registration completed.");
            return { data, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error };
        }
    };

    const logoutUser = () => {
        navigate("/");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        API.logout();
        processSuccess("Logged out successfully.");
        setUser(null);
    };

    const refreshUser = async (phoneNumber) => {
        try {
            const { data, error } = await API.refreshUser(phoneNumber);
            if (error) {
                processError(error);
                return { data: null, error };
            }
            const newUser = { ...data.user };
            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));
            localStorage.setItem("token", data.token);
            processSuccess("User data refreshed.");
            return { data, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error };
        }
    };

    const updateDexcomSessionId = async (phoneNumber, dexcomUser, dexcomPass) => {
        try {
            const { data, error } = await API.updateDexcomSessionId(phoneNumber, dexcomUser, dexcomPass);
            // console.log(data);
            if (error) {
                processError(error);
                return { data: null, error };
            }
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            processSuccess("Data updated.");
            return { data, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error };
        }
    };

    const deleteUser = async (phoneNumber) => {
        try {
            const response = await API.deleteUser(phoneNumber);
            if (!response.success) {
                processError(response.message || "Failed to delete user.");
                return { data: null, error: response.message };
            }
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/");
            processSuccess("User deleted.");
            return { data: response, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error };
        }
    };

    const updateUser = async (phoneNumber, name, glucagonLocation, glucagonType, allergies, medications, diagnoses, crisisText) => {
        try {
            const updatedData = {
                phoneNumber,
                ...(name && { name }),
                ...(glucagonLocation && { glucagonLocation }),
                ...(glucagonType && { glucagonType }),
                ...(allergies && { allergies }),
                ...(medications && { medications }),
                ...(diagnoses && { diagnoses }),
                ...(crisisText && { crisisText }),
            };

            const { data, error } = await API.updateUser(updatedData);
            if (error) {
                processError(error);
                console.error("Error updating user data:", error);
                return { data: null, error };
            }
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            processSuccess("User updated.");
            return { data, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error };
        }
    };

    const getUserContacts = async (userId) => {
        try {
            const { data, error } = await API.getUserContacts(userId);
            if (error) {
                processError(error);
                return { data: null, error };
            }
            return { data, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error };
        }
    };
    const addContact = async (userId, contactPhoneNumber, contactFirstName, contactLastName, contactRelationship) => {
        try {
            const response = await API.addContact(userId, contactPhoneNumber, contactFirstName, contactLastName, contactRelationship);
            if (response.error) {
                processError(response.error);
                return { data: null, error: response.error };
            }
            processSuccess("Code sent.");
            return { data: response.data, error: null }; // Assuming response.data contains the added contact information
        } catch (error) {
            processError(error);
            return { data: null, error: error.message };
        }
    };

    const verifyContact = async (userId, contactPhoneNumber, verificationCode, contactFirstName, contactLastName, contactRelationship) => {
        try {
            const response = await API.verifyContact(userId, contactPhoneNumber, verificationCode, contactFirstName, contactLastName, contactRelationship);
            if (response.error) {
                processError(response.error);
                return { data: null, error: response.error };
            }
            processSuccess("Contact verified successfully.");
            return { data: response.data, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error: error.message };
        }
    };

    const toggleContactActiveStatus = async (userId, contactId) => {
        try {
            const response = await API.toggleContactActiveStatus(userId, contactId);
            if (response.error) {
                processError(response.error);
                return { data: null, error: response.error };
            }
            processSuccess("Contact toggled.");
            return { data: response.data, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error: error.message };
        }
    };

    const editContact = async (userId, contactId, contactFirstName, contactLastName, contactRelationship) => {
        try {
            const { data, error } = await API.editContact(userId, contactId, contactFirstName, contactLastName, contactRelationship);
            if (error) {
                processError(error);
                return { data: null, error };
            }
            processSuccess("Contact updated successfully.");
            return { data, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error: error.message };
        }
    };

    const deleteContact = async (userId, contactId) => {
        try {
            const response = await API.deleteContact(userId, contactId);
            if (response.error) {
                processError(response.error);
                return { data: null, error: response.error };
            }
            processSuccess("Contact deleted successfully.");
            return { data: response.data, error: null };
        } catch (error) {
            processError(error);
            return { data: null, error: error.message };
        }
    };

    const updateThresholdValue = async (phoneNumber, lowAlarm) => {
        try {
            const response = await API.updateLowAlarm(phoneNumber, lowAlarm);
            // console.log(response);
            if (response.error) {
                processError(response.error);
                return { data: null, error: response.error };
            }
            processSuccess("Low Alarm updated successfully.");
            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token);
            return { data: response.data, error: null };
        } catch (error) {
            processError(error.message);
            return { success: false };
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        API.onTokenInvalid = logoutUser;
    }, [logoutUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                //
                loginUser,
                completeLogin,
                registerUser,
                completeRegistration,
                logoutUser,
                //
                updateDexcomSessionId,
                refreshUser,
                updateThresholdValue,
                //
                deleteUser,
                updateUser,
                //
                getUserContacts,
                addContact,
                verifyContact,
                toggleContactActiveStatus,
                editContact,
                deleteContact,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/apiClient";
import { errorTypes } from "../services/errorTypes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const navigate = useNavigate();

    const processError = (error) => {
        const errorMessage = error?.response?.data?.error
            ? errorTypes[error.response.data.error] || error.response.data.error
            : error.message || errorTypes.SERVER_ERROR;
        console.error("Error:", errorMessage);
        return { data: null, error: errorMessage };
    };

    const loginUser = async (phoneNumber) => {
        try {
            const { data, error } = await API.login(phoneNumber);
            if (error) {
                return processError({ message: error });
            }
            return { data, error: null };
        } catch (error) {
            return processError(error);
        }
    };

    const completeLogin = async (phoneNumber, code) => {
        try {
            const { data, error } = await API.completeLogin(phoneNumber, code);
            if (!error) {
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                return { data, error: null };
            }
            return processError({ message: error });
        } catch (error) {
            return processError(error);
        }
    };

    const registerUser = async (phoneNumber) => {
        try {
            const { data, error } = await API.registerUser(phoneNumber);
            if (error) {
                return processError({ message: error });
            }
            return { data, error: null };
        } catch (error) {
            return processError(error);
        }
    };

    const completeRegistration = async (
        phoneNumber,
        code,
        name,
        dexcomUser,
        dexcomPass
    ) => {
        try {
            const { data, error } = await API.completeRegistration(
                phoneNumber,
                code,
                name,
                dexcomUser,
                dexcomPass
            );
            if (!error) {
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                return { data, error: null };
            }
            return processError({ message: error });
        } catch (error) {
            return processError(error);
        }
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
        API.logout();
        navigate("/");
    };

    const updateUser = async (phoneNumber) => {
        try {
            const { data, error } = await API.updateUser(phoneNumber);
            if (error) {
                return processError({ message: error });
            }
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            return { data, error: null };
        } catch (error) {
            return processError(error);
        }
    };

    const updateDexcomSessionId = async (
        phoneNumber,
        dexcomUser,
        dexcomPass
    ) => {
        try {
            const { data, error } = await API.updateDexcomSessionId(
                phoneNumber,
                dexcomUser,
                dexcomPass
            );
            if (error) {
                return processError({ message: error });
            }
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            return { data, error: null };
        } catch (error) {
            return processError(error);
        }
    };

    const deleteUser = async (phoneNumber) => {
        try {
            const response = await API.deleteUser(phoneNumber);
            if (!response.success) {
                return processError({
                    message: response.message || "Failed to delete user.",
                });
            }
            setUser(null);
            localStorage.removeItem("user");
            navigate("/");
            return { data: response, error: null };
        } catch (error) {
            return processError(error);
        }
    };

    const getUserContacts = async (userId) => {
        try {
            const { data, error } = await API.getUserContacts(userId);
            if (error) {
                return processError({ message: error });
            }
            return { data, error: null };
        } catch (error) {
            return processError(error);
        }
    };

    const addContact = async (
        userId,
        contactPhoneNumber,
        contactFirstName,
        contactLastName,
        contactRelationship
    ) => {
        try {
            const { data, error } = await API.addContact(
                userId,
                contactPhoneNumber,
                contactFirstName,
                contactLastName,
                contactRelationship
            );
            if (error) {
                return processError({ message: error });
            }
            return { data, error: null };
        } catch (error) {
            return processError(error);
        }
    };

    const verifyContact = async (userId, contactPhoneNumber, code) => {
        try {
            const { data, error } = await API.verifyContact(
                userId,
                contactPhoneNumber,
                code
            );
            if (error) {
                return processError({ message: error });
            }
            return { data, error: null };
        } catch (error) {
            return processError(error);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loginUser,
                completeLogin,
                registerUser,
                completeRegistration,
                logoutUser,
                updateUser,
                updateDexcomSessionId,
                deleteUser,
                getUserContacts,
                addContact,
                verifyContact,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
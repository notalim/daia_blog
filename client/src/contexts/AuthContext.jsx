import React, { createContext, useState, useEffect } from "react";
import API from "../services/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const loginUser = async (phoneNumber) => {
        try {
            const { data, error } = await API.login({ phoneNumber });
            if (!error) {
                setUser(data.user); // set the user in context
                localStorage.setItem("user", JSON.stringify(data.user)); // Persist the user for session management
            } else {
                throw new Error(error);
            }
        } catch (error) {
            console.error("Login failed: ", error);
        }
    };

    const completeLogin = async (phoneNumber, code) => {
        try {
            const { data, error } = await API.completeLogin({
                phoneNumber,
                code,
            });
            if (!error) {
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
            } else {
                throw new Error(error);
            }
        } catch (error) {
            console.error("Login completion failed: ", error);
        }
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
        API.logout();
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, loginUser, completeLogin, logoutUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

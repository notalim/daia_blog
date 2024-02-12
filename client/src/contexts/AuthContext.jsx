import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/apiClient";
import { errorTypes } from "../services/errorTypes";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // console.log(localStorage.getItem("user"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const navigate = useNavigate();

    const loginUser = async (phoneNumber) => {
        try {
            console.log("Requesting a code to login user: ", phoneNumber);
            const { data, error } = await API.login( phoneNumber );

            if (error) {
                throw new Error(error);
            }
            return { data, error };
        } catch (error) {
            console.error("Requesting a code failed: ", error);
            return { data, error };
        }
    };

    const completeLogin = async (phoneNumber, code) => {
        try {
            const { data, error } = await API.completeLogin(
                phoneNumber,
                code,
            );
            console.log(data);
            if (!error) {
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
            } else {
                throw new Error(error);
            }
            return { data, error };
        } catch (error) {
            console.error("Login completion failed: ", error);
            return { data, error };
        }
    };

    const registerUser = async (phoneNumber) => {
        try {
            const { data, error } = await API.registerUser(phoneNumber);
            if (error) {
                throw new Error(error);
            }
            return {data, error};
        } catch (error) {
            console.error("Requesting a code failed: ", error);
            return { data, error };
        }
    };


    const completeRegistration = async (phoneNumber, code, name, dexcomUser, dexcomPass) => {

        try {
            const { data, error } = await API.completeRegistration(
                phoneNumber,
                code,
                name,
                dexcomUser,
                dexcomPass,
            );
            if (!error) {
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
            } else {
                throw new Error(error);
            }
            return { data, error };
        } catch (error) {
            console.error("Registration completion failed: ", error);
            return { data, error };
        }
    }

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
                throw new Error(error);
            }
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            return { data, error };
        } catch (error) {
            console.error("Updating user failed: ", error);
            return { data, error };
        }
    }


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
                updateUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

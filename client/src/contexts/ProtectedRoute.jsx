import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useProcessMessages from "./useProcessMessages";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { processError } = useProcessMessages();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    // Token has expired
                    processError("Session expired. Please log in again.");
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } catch (error) {
                // Invalid token
                processError("Invalid token. Please log in again.");
                console.error("Invalid token", error);
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    }, [token, navigate]);

    return token ? children : null;
};

export default ProtectedRoute;

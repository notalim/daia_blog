// App.jsx
import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./containers/LandingPage";
import RegisterPage from "./containers/RegisterPage";
import LoginPage from "./containers/LoginPage";
import UserDashboardPage from "./containers/UserDashboardPage";

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<UserDashboardPage />} />
            </Routes>
            <Footer />
        </AuthProvider>
    );
}

export default App;

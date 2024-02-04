// App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppProvider } from "./AppContext";
import LandingPage from "./containers/LandingPage";
import RegisterPage from "./containers/RegisterPage";
import LoginPage from "./containers/LoginPage";

import { Routes, Route, Router } from "react-router-dom";

function App() {
    return (
        <AppProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Footer />
        </AppProvider>
    );
}

export default App;

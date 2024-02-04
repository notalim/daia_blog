// App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./containers/LandingPage";
import RegisterPage from "./containers/RegisterPage";
import LoginPage from "./containers/LoginPage";
// import UserProfile from "./containers/UserProfile";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="/profile" element={<UserProfile />} /> Uncomment and add the profile route */}
            </Routes>
            <Footer />
        </AuthProvider>
    );
}

export default App;

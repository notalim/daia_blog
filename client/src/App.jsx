// App.jsx
import React from "react";

import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserDashboardPage from "./pages/UserDashboardPage";

import PageLayout from "./pages/Page/Page";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PageLayout>
                            <LandingPage />
                        </PageLayout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PageLayout>
                            <RegisterPage />
                        </PageLayout>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PageLayout>
                            <LoginPage />
                        </PageLayout>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PageLayout>
                            <UserDashboardPage />
                        </PageLayout>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;

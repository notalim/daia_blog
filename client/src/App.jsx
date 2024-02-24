import React from "react";

import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./contexts/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserDashboardPage from "./pages/UserDashboardPage";

import PageLayout from "./pages/Page/Page";

import { Toaster } from "@/components/ui/toaster";

function App() {
    return (
        <AuthProvider>
            <Toaster />
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
                        <ProtectedRoute>
                            <PageLayout>
                                <UserDashboardPage />
                            </PageLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;

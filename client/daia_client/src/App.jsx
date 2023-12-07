// App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import { AppProvider } from "./AppContext";
import LandingPage from "./containers/LandingPage";
import RegisterPage from "./containers/RegisterPage";
import { Routes, Route, Router} from "react-router-dom";

function App() {
    return (
        <AppProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
    
        </AppProvider>
    );
}

export default App;

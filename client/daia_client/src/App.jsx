// App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import { AppProvider } from "./AppContext";
import LandingPage from "./containers/LandingPage";
import RegisterPage from "./containers/RegisterPage";

function App() {
    return (
        <AppProvider>
            <div className="App">
                <LandingPage />
                <RegisterPage />
            </div>
        </AppProvider>
    );
}

export default App;

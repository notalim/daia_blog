// App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import { AppProvider } from "./AppContext";
import LandingPage from "./containers/LandingPage";

function App() {
    return (
        <AppProvider>
            <div className="App">
                <Navbar />
                <LandingPage />
            </div>
        </AppProvider>
    );
}

export default App;

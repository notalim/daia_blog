// src/components/Header.jsx
import React from "react";

function Header({ isLoggedIn }) {
    return (
        <header>
            <div className="logo">DAIA</div>
            <nav>
                <button className="home-button">Home</button>
                <button className="auth-button">
                    {isLoggedIn ? "Log Out" : "Log In"}
                </button>
            </nav>
        </header>
    );
}

export default Header;

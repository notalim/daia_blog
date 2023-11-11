import React from "react";
import "./styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__logo">Daia</div>
            <ul className="navbar__links">
                <li>
                    <a href="#home" className="navbar__link">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#about" className="navbar__link">
                        About Us
                    </a>
                </li>
                <li>
                    <a href="#use" className="navbar__link">
                        How to use
                    </a>
                </li>
                {/* Add other links as needed */}
            </ul>
            <button className="navbar__register">Register</button>
        </nav>
    );
}

export default Navbar;

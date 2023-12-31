import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import daiaLogo from '../assets/icons/daia-logo.svg'

const LinkItems = [
    { name: "Home", pathname: "/" },
    { name: "About Us", pathname: "/about" },
    { name: "How to use", pathname: "/faq" },
];

const Navbar = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();

    const NavItem = ({ name, pathname }) => {
        const isActive = location.pathname === pathname;
        return (
            <Link to={pathname} className={`mx-4`}>
                <div
                    className={`${
                        isActive
                            ? "text-primary border-b-2 border-primary font-medium"
                            : "text-gray-600 hover:text-black"
                    } text-base cursor-pointer`}
                    onClick={() => setActiveTab(name)}
                >
                    {name}
                </div>
            </Link>
        );
    };

    return (
        <nav className="bg-primary p-4 text-secondary py-4 px-6 flex justify-between items-center shadow-md">
            <div className="flex items-center">
                <Link to="/" className={`mx-4`}>
                    <img
                        src={daiaLogo}
                        alt="Daia"
                        className="h-8 w-auto mr-2"
                    />
                </Link>
            </div>
            <div className="flex">
                {LinkItems.map((link) => (
                    <NavItem
                        key={link.name}
                        name={link.name}
                        pathname={link.pathname}
                    />
                ))}
            </div>
            <div className="flex items-center">
                <Link
                    to="/register"
                    className="text-black font-medium text-base mr-4"
                >
                    Register
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;

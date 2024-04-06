import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../@/components/ui/button";

const LeftSidebar = ({ selectedTab, handleTabClick }) => {
    const location = useLocation();

    // Define the list of sidebar links
    const sidebarLinks = [
        { name: "Account", path: "/account" },
        { name: "Health", path: "/Health" },
        { name: "Notifications", path: "/notifications" },
    ];

    // Function to handle tab selection

    return (
        <div className="bg-dim-purple p-4">
            {sidebarLinks.map((link, index) => (
                <Button
                    key={index}
                    variant="daia"
                    className={`rounded-md mb-6 w-full hover:bg-purple-400 hover:cursor-pointer}`}
                    onClick={() => handleTabClick(link.name)}
                >
                    {link.name}
                </Button>
            ))}
        </div>
    );
};

export default LeftSidebar;

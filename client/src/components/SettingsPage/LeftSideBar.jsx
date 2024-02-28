import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../@/components/ui/button";

const LeftSidebar = ({ selectedTab, handleTabClick }) => {
	const location = useLocation();

	// Define the list of sidebar links
	const sidebarLinks = [
		{ name: "Account", path: "/account" },
		{ name: "Health", path: "/health" },
		{ name: "Notifications", path: "/notifications" },
	];

	// Function to handle tab selection

	return (
		<div className="bg-purple-200 p-4">
			{/* Render sidebar links */}
			{sidebarLinks.map((link, index) => (
				<Button
					key={index}
					className={`rounded-md mb-6 w-full hover:cursor-pointer bg-full-purple${
						location.pathname === link.path
							? "bg-purple-300"
							: "hover:bg-purple-400"
					}`}
					onClick={() => handleTabClick(link.name)}
				>
					{link.name}
				</Button>
			))}
		</div>
	);
};

export default LeftSidebar;

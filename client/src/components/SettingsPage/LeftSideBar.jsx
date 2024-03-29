import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../@/components/ui/button";

const LeftSidebar = ({ selectedTab, handleTabClick }) => {
	const location = useLocation();

	// Define the list of sidebar links
	const sidebarLinks = [
		{ name: "Health", path: "/Health" },
		{ name: "Notifications", path: "/notifications" },
	];

	// Function to handle tab selection

	return (
		<div className="bg-purple-200 p-4">
			{sidebarLinks.map((link, index) => (
				<Button
					key={index}
					className={`rounded-md mb-6 w-full hover:bg-purple-400 hover:cursor-pointer ${
						selectedTab === link.name
							? "bg-purple-400"
							: "bg-full-purple"
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

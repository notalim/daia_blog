import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import daiaLogo from "../../assets/icons/daia-logo.svg";
import { LinkItems } from "./navLinks";
import { Button, Popover, Typography } from "@mui/material";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../contexts/useAuth";
import InstagramIcon from "@mui/icons-material/Instagram";

const NavbarLoggedIn = () => {
	const [activeTab, setActiveTab] = useState("Home");
	const [anchorEl, setAnchorEl] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const { user, logoutUser, updateUser, updateDexcomSessionId, deleteUser } =
		useAuth();
	const handleLogout = () => {
		logoutUser();
	};

	const location = useLocation();
	const isMobile = useMediaQuery({ maxWidth: 768 });

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
					onClick={() => {
						setActiveTab(name);
						setAnchorEl(null);
					}}
				>
					{name}
				</div>
			</Link>
		);
	};

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
		setIsOpen(false);
		// console.log("OPEN", isOpen);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
		setIsOpen(true);
		// console.log("Close", isOpen);
	};

	return (
		<nav className="bg-background-purple p-4 text-secondary py-4 px-6 flex justify-between items-center">
			<div className="flex items-center">
				<Link to="/" className={`mx-4`}>
					<img
						src={daiaLogo}
						alt="Daia"
						className="h-8 w-auto mr-2"
					/>
				</Link>
			</div>
			{isMobile ? (
				<div className="flex items-center">
					<FaBars
						className="text-black cursor-pointer"
						onClick={handlePopoverOpen}
					/>
					<Popover
						open={Boolean(anchorEl)}
						anchorEl={anchorEl}
						onClose={handlePopoverClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
					>
						<div className="p-4 bg-white rounded shadow-lg">
							{/* {LinkItems.map((link) => (
								<NavItem
									key={link.name}
									name={link.name}
									pathname={link.pathname}
								/>
							))} */}
							<div className="flex flex-col mt-4">
							<Link
									to="/about"
									className="text-gray-800 font-medium text-base mb-2 hover:text-purple-600"
								>
									About Us
								</Link>
								<Link
									to="/faq"
									className="text-gray-800 font-medium text-base mb-2 hover:text-purple-600"
								>
									FAQ
								</Link>
								<Link
									to="/dashboard"
									className="text-gray-800 font-medium text-base mb-2 hover:text-purple-600"
								>
									Dashboard
								</Link>
								<Link
									to="/settings"
									className="text-gray-800 font-medium text-base mb-2 hover:text-purple-600"
								>
									Settings
								</Link>
								<button
									onClick={handleLogout}
									className="text-gray-800 font-medium text-base hover:text-purple-600 cursor-pointer mr-3"
								>
									Log Out
								</button>
							</div>
						</div>
					</Popover>
				</div>
			) : (
				<div className="flex">
					{/* {LinkItems.map((link) => (
						<NavItem
							key={link.name}
							name={link.name}
							pathname={link.pathname}
						/>
					))} */}
					<div className="flex items-center">
					<Link
							to="/about"
							className="text-black font-medium text-base mr-4"
						>
							About
						</Link>
						<Link
							to="/faq"
							className="text-black font-medium text-base mr-4"
						>
							FAQ
						</Link>
						<Link
							to="/dashboard"
							className="text-black font-medium text-base mr-4"
						>
							Dashboard
						</Link>
						<Link
							to="/settings"
							className="text-black font-medium text-base mr-4"
						>
							Settings
						</Link>
						<Link
							onClick={handleLogout}
							className="text-black font-medium text-base mr-4"
						>
							Log Out
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
};

export default NavbarLoggedIn;

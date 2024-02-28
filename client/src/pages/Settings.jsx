import React, { useState } from "react";
import UserInformation from "../components/UserInformation";
import { useAuth } from "../contexts/useAuth";
import LeftSidebar from "../components/SettingsPage/LeftSideBar";
import AccountPage from "../components/SettingsPage/Account";

const Settings = () => {
	const { user, logoutUser, updateUser, updateDexcomSessionId, deleteUser } =
		useAuth();

	const [selectedTab, setSelectedTab] = useState("Account");

	const handleLogout = () => {
		logoutUser();
	};

	const handleDeleteUser = () => {
		deleteUser(user.phoneNumber);
	};

	const handleTabClick = (tab) => {
		setSelectedTab(tab);
	};

	// const handleThemeChange = (selectedTheme) => {
	// 	setTheme(selectedTheme);
	// 	// You can implement logic to persist the selected theme, such as storing it in local storage or sending it to a backend server
	// };

	return (
		<div className="container mx-auto">
			<h1 className="text-3xl font-bold mb-4">Welcome {user.name}</h1>
			<div className="flex h-full rounded-md p-6 mb-20">
				<div className="bg-purple-200 w-1/4 p-4">
					<h2 className="text-2xl font-bold">Settings</h2>
					<LeftSidebar
						selectedTab={selectedTab}
						handleTabClick={handleTabClick}
					/>
				</div>

				<div className="bg-white w-3/4 p-4 h-fit flex justify-center">
					<div className="flex flex-col justify-center items-center">
						<h1 className="text-3xl font-bold mb-4 text-left">
							Account
						</h1>
						{/* Content for the right side goes here */}
						{selectedTab === "Account" && (
							<div className="h-96 w-full flex justify-center">
								<AccountPage />
							</div>
						)}
						{selectedTab === "Health" && (
							<div className="h-96 w-full flex justify-center">
								Health
							</div>
						)}
						{selectedTab === "Notifications" && (
							<div className="h-96 w-full flex justify-center">
								Notifications
							</div>
						)}
					</div>
				</div>
			</div>
			{/* <div className="p5 mb-5">
				<UserInformation
					user={user}
					handleDeleteUser={handleDeleteUser}
					handleLogout={handleLogout}
				/>
			</div> */}
		</div>
	);
};

export default Settings;

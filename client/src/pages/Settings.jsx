import React, { useState } from "react";
import UserInformation from "../components/UserInformation";
import { useAuth } from "../contexts/useAuth";

const Settings = () => {
	const [theme, setTheme] = useState("light");
	const { user, logoutUser, updateUser, updateDexcomSessionId, deleteUser } =
		useAuth();

	const handleLogout = () => {
		logoutUser();
	};

	const handleDeleteUser = () => {
		deleteUser(user.phoneNumber);
	};

	// const handleThemeChange = (selectedTheme) => {
	// 	setTheme(selectedTheme);
	// 	// You can implement logic to persist the selected theme, such as storing it in local storage or sending it to a backend server
	// };

	return (
		<div className="container mx-auto">
			<h1 className="text-3xl font-bold mb-4">Settings</h1>
			<div className="p5">
				<UserInformation
					user={user}
					handleDeleteUser={handleDeleteUser}
					handleLogout={handleLogout}
				/>
			</div>
		</div>
		// <div
		// 	className={`bg-${theme === "light" ? "white" : "gray-900"} text-${
		// 		theme === "light" ? "black" : "white"
		// 	} min-h-screen`}
		// >
		// 	<div className="container mx-auto p-4">
		// 		<h1
		// 			className={`text-${
		// 				theme === "light" ? "black" : "white"
		// 			} text-3xl font-bold mb-4`}
		// 		>
		// 			Settings
		// 		</h1>
		// 		<div className="flex items-center mb-4">
		// 			{/* <span
		// 				className={`text-${
		// 					theme === "light" ? "black" : "white"
		// 				} mr-2`}
		// 			>
		// 				Theme:
		// 			</span> */}
		// 			{/* <select
		// 				className={`px-2 py-1 border border-${
		// 					theme === "light" ? "gray-300" : "gray-700"
		// 				} rounded`}
		// 				value={theme}
		// 				onChange={(e) => handleThemeChange(e.target.value)}
		// 			>
		// 				<option value="light">Light</option>
		// 				<option value="dark">Dark</option>
		// 			</select> */}
		// 		</div>
		// 		{/* Other settings options can be added here */}
		// 	</div>
		// </div>
	);
};

export default Settings;

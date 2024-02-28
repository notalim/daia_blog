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
			<h1 className="text-3xl font-bold mb-4">Welcome {user.name}</h1>
			<div className="p5 mb-5">
				<UserInformation
					user={user}
					handleDeleteUser={handleDeleteUser}
					handleLogout={handleLogout}
				/>
			</div>
		</div>
	);
};

export default Settings;

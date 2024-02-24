import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/useAuth";

import BloodSugarScatterPlot from "../components/BloodSugarScatterPlot";
import ContactList from "../components/ContactList/ContactList";
import ThresholdSlider from "../components/ThresholdSlider/ThresholdSlider";

import moment from "moment";

import UserInformation from "../components/UserInformation";

const UserDashboardPage = () => {
	const { user, logoutUser, updateUser, updateDexcomSessionId, deleteUser } =
		useAuth();
	const [dataIsOld, setDataIsOld] = useState(false);
	const [thresholdValue, setThresholdValue] = useState(180);

	// ! set user.thresholdValue at backend later!

	useEffect(() => {
		if (user.bloodSugarData.length === 0) {
			console.log("No blood sugar data available.");
			setDataIsOld(false);
			return;
		}

		const latestDataTime = moment(
			user.bloodSugarData[user.bloodSugarData.length - 1]?.WT
		);
		const thirtyMinutesAgo = moment().subtract(30, "minutes");

		// console.log(`Latest Data Time: ${latestDataTime}`);
		// console.log(`Thirty Minutes Ago: ${thirtyMinutesAgo}`);
		// console.log(
		//     `Is latest data time before thirty minutes ago? ${latestDataTime.isBefore(
		//         thirtyMinutesAgo
		//     )}`
		// );

		if (latestDataTime.isBefore(thirtyMinutesAgo)) {
			setDataIsOld(true);
		} else {
			setDataIsOld(false);
		}
	}, [user.bloodSugarData]);

	const handleRefreshData = async () => {
		await updateUser(user.phoneNumber);
		setDataIsOld(false);
	};

	const handleDexcomSessionIdRefresh = async () => {
		await updateDexcomSessionId(
			user.phoneNumber,
			user.dexcomUser,
			user.dexcomPass
		);
	};

	const handleLogout = () => {
		logoutUser();
	};

	const handleDeleteUser = () => {
		deleteUser(user.phoneNumber);
	};

	const handleThresholdSave = (newThreshold) => {
		// TODO: Save the new threshold to the backend
		setThresholdValue(newThreshold);
	};

	const bloodSugarData = user.bloodSugarData;

	// console.log("User: ", user);

	return (
		<div className="container mx-auto">
			<h1 className="text-2xl font-bold">Hello, {user.name}!</h1>
			<div className="grid grid-cols-5 my-4 gap-4">
				<div className="col-span-3">
					<BloodSugarScatterPlot
						bloodSugarData={bloodSugarData}
						thresholdValue={thresholdValue}
						onRefresh={handleRefreshData}
						dataIsOld={dataIsOld}
						onDexcomSessionIdRefresh={handleDexcomSessionIdRefresh}
					/>
				</div>
				<div className="col-span-2 bg-lavender-purple p-4 border rounded-lg">
					<ContactList />
				</div>
			</div>
			<div className="p-5">
				<UserInformation
					user={user}
					handleDeleteUser={handleDeleteUser}
					handleLogout={handleLogout}
				/>
			</div>
		</div>
	);
};

export default UserDashboardPage;

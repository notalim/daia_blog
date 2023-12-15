import React from "react";
import "../containers/styles/MainPage.css";
import EmergencyContactGrid from "../components/EmergencyContactsGrid";
import BloodSugarGraph from "../components/BloodSugarGraph";

function MainPage() {
	const bloodSugarData = [
		{ time: "11:04", level: 100 },
		{ time: "11:19", level: 150 },
		{ time: "11:34", level: 200 },
		// ... more data
	];
	return (
		<div className="main-page bg-gray-100 p-4">
			<h1 className="text-2xl font-bold mb-4">DAIA Dashboard</h1>
			<div className="main-page-content">
				<div className="main-page-content-right">
					<BloodSugarGraph data={bloodSugarData} />
					<EmergencyContactGrid />
				</div>
			</div>
		</div>
	);
}

export default MainPage;

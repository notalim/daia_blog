import React from "react";
import EmergencyContacts from "./Emergency_Contacts"; // Import the EmergencyContacts component

const EmergencyContactsGrid = () => {
	return (
		// Grid container with a max-width and centered
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			{/* Grid setup for 3 columns and auto rows */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* You would repeat your EmergencyContacts component six times for a 3x2 grid */}
				<EmergencyContacts />
				<EmergencyContacts />
				<EmergencyContacts />
				<EmergencyContacts />
				<EmergencyContacts />
				<EmergencyContacts />
			</div>
		</div>
	);
};

export default EmergencyContactsGrid;

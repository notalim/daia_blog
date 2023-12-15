import React from "react";

const EmergencyContacts = () => {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
			<div className="flex items-center mb-4">
				<div className="bg-purple-500 text-white text-2xl rounded-full h-12 w-12 flex justify-center items-center mr-4">
					JD
				</div>
				<div className="text-xl font-semibold">Jane Doe</div>
			</div>
			<div className="text-gray-800">
				{/* You can add more contact fields here */}
				<p className="mb-2">Phone: (123) 456-7890</p>
				<p className="mb-2">Email: janedoe@example.com</p>
				<p className="mb-2">Address: 123 Main St, Anytown, AN 12345</p>
			</div>
		</div>
	);
};

export default EmergencyContacts;

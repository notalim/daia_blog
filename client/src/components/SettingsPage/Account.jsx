import React, { useState } from "react";
import { Input } from "../../@/components/ui/input";
import { Button } from "../../@/components/ui/button";

const AccountPage = () => {
	// Initial user data
	const initialUserData = {
		photo: "URL_TO_DEFAULT_PHOTO",
		name: "John Doe",
		username: "johndoe123",
		email: "johndoe@example.com",
		phoneNumber: "123-456-7890",
	};

	// State to store user data
	const [userData, setUserData] = useState(initialUserData);

	// Function to handle form input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData({
			...userData,
			[name]: value,
		});
	};

	// Function to handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		// Here you can send the updated user data to the server or perform other actions
		console.log("Updated user data:", userData);
	};

	return (
		<div className="container mx-auto">
			<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
				<div className="flex items-center">
					<label htmlFor="photo" className="mr-2">
						Photo
					</label>
				</div>
				<div>
					<Input
						type="text"
						id="photo"
						name="photo"
						value={userData.photo}
						onChange={handleInputChange}
						className="border border-gray-300 p-2 w-full"
					/>
				</div>
				<div className="flex items-center">
					<label htmlFor="name" className="mr-2">
						Name
					</label>
				</div>
				<div>
					<Input
						type="text"
						id="name"
						name="name"
						value={userData.name}
						onChange={handleInputChange}
						className="border border-gray-300 p-2 w-full"
					/>
				</div>
				<div className="flex items-center">
					<label htmlFor="username" className="mr-2">
						Username
					</label>
				</div>
				<div>
					<Input
						type="text"
						id="username"
						name="username"
						value={userData.username}
						onChange={handleInputChange}
						className="border border-gray-300 p-2 w-full"
					/>
				</div>
				<div className="flex items-center">
					<label htmlFor="email" className="mr-2">
						Email
					</label>
				</div>
				<div>
					<Input
						type="email"
						id="email"
						name="email"
						value={userData.email}
						onChange={handleInputChange}
						className="border border-gray-300 p-2 w-full"
					/>
				</div>
				<div className="flex items-center">
					<label htmlFor="phoneNumber" className="mr-2">
						Phone Number
					</label>
				</div>
				<div>
					<Input
						type="tel"
						id="phoneNumber"
						name="phoneNumber"
						value={userData.phoneNumber}
						onChange={handleInputChange}
						className="border border-gray-300 p-2 w-full"
					/>
				</div>
				<div className="col-span-2 flex justify-center">
					<Button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Save Changes
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AccountPage;

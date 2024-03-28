import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import LeftSidebar from "../components/SettingsPage/LeftSideBar";
import AccountPage from "../components/SettingsPage/Account";

const Settings = () => {
	const { user } = useAuth();

	const [selectedTab, setSelectedTab] = useState("Account");

	const handleTabClick = (tab) => {
		console.log(user);
		setSelectedTab(tab);
	};

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

				<div className="bg-white w-3/4 p-4 h-full flex justify-center">
					<div className="flex flex-col justify-center items-center">
						{/* Content for the right side goes here */}
						{selectedTab === "Account" && (
							<div className="h-96">
								<h1 className="text-3xl font-bold mb-8">
									Account
								</h1>
								<div className="w-full flex justify-center">
									<AccountPage user={user} />
								</div>
							</div>
						)}
						{selectedTab === "Health" && (
							<div className="h-96">
								<h1 className="text-3xl font-bold mb-4">
									Health
								</h1>
								<div className="w-full flex justify-center">
									<AccountPage user={user} />
								</div>
							</div>
						)}
						{selectedTab === "Notifications" && (
							<div className="h-96">
								<h1 className="text-3xl font-bold mb-4 text-left">
									Notifications
								</h1>
								<div className="w-full flex justify-center">
									<AccountPage user={user} />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;

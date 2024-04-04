import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import LeftSidebar from "../components/SettingsPage/LeftSideBar";
import HealthPage from "../components/SettingsPage/Health.jsx";
import NotificationsPage from "../components/SettingsPage/Notifications.jsx";
import AccountPage from "../components/SettingsPage/Account.jsx";

const Settings = () => {
  const { user } = useAuth();

  const [selectedTab, setSelectedTab] = useState("Account");

  const handleTabClick = (tab) => {
    console.log(user);
    setSelectedTab(tab);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 my-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}!</h1>
      <div className="flex flex-col lg:flex-row gap-8 h-full rounded-md p-6 mb-20">
        <div className="bg-purple-200 lg:w-1/4 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <LeftSidebar selectedTab={selectedTab} handleTabClick={handleTabClick} />
        </div>

        <div className="flex-1 bg-white p-4 h-full rounded-lg flex justify-center">
          <div className="flex flex-col justify-center items-center">
            {/* Content for the right side goes here */}
            {selectedTab === "Account" && (
              <div>
                <h1 className="text-3xl font-bold mb-8">Account</h1>
                <div className="w-full flex justify-center">
                  <AccountPage user={user} />
                </div>
              </div>
            )}
            {selectedTab === "Health" && (
              <div>
                <h1 className="text-3xl font-bold mb-8">Health</h1>
                <div className="w-full flex justify-center">
                  <HealthPage user={user} />
                </div>
              </div>
            )}
            {selectedTab === "Notifications" && (
              <div>
                <h1 className="text-3xl font-bold mb-4 text-left">Notifications</h1>
                <div className="w-full flex justify-center">
                  <NotificationsPage user={user} />
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

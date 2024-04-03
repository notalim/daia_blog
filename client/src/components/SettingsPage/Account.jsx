import React, { useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { Input } from "../../@/components/ui/input";
import { Button } from "../../@/components/ui/button";

const AccountPage = ({ user }) => {
  const { updateUser } = useAuth();

  // Initial user data
  const initialUserData = {
    name: user.name,
    dexcomUser: user.dexcomUser,
    dexcomPass: "**********", // user.dexcomPass,
    phoneNumber: user.phoneNumber,
    glucagonLocation: user.glucagonLocation,
    glucagonType: user.glucagonType,
    crisisText: user.crisisText,
    emergencyInfo: user.emergencyInfo,
  };

  // State to store user data
  const [userData, setUserData] = useState(initialUserData);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await updateUser(userData.phoneNumber, userData.name, userData.glucagonLocation, userData.glucagonType, userData.crisisText, userData.emergencyInfo);
    if (!error) {
      console.log("User data updated successfully");
    } else {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
        <div className="flex items-center">
          <label htmlFor="name" className="mr-2">
            Name
          </label>
        </div>
        <div>
          <Input type="text" id="name" name="name" value={userData.name} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
        </div>

        <div className="flex items-center">
          <label htmlFor="name" className="mr-2">
            Phone Number
          </label>
        </div>
        <div>
          <Input type="text" id="phoneNumber" name="phoneNumber" value={userData.phoneNumber} className="border border-gray-400 p-2 w-full" disabled />
          {/* <p className="text-xs text-gray-600 mt-1">Contact support to update phone number.</p> */}
        </div>

        <div className="flex items-center">
          <label htmlFor="dexcomUser" className="mr-2">
            Dexcom Username
          </label>
        </div>
        <div>
          <Input type="text" id="dexcomUser" name="dexcomUser" value={userData.dexcomUser} className="border border-gray-400 p-2 w-full" disabled />
          {/* <p className="text-xs text-gray-600 mt-1">Contact support to update username.</p> */}
        </div>
        <div className="flex items-center">
          <label htmlFor="dexcomPass" className="mr-2">
            Dexcom Password
          </label>
        </div>
        <div>
          <Input type="password" id="dexcomPass" name="dexcomPass" value={userData.dexcomPass} className="border border-gray-400 p-2 w-full" disabled />
          {/* <p className="text-xs text-gray-600 mt-1">Contact support to update password.</p> */}
        </div>
        <div className="col-span-2 flex justify-center">
          <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountPage;

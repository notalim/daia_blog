import React, { useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { Input } from "../../@/components/ui/input";
import { Button } from "../../@/components/ui/button";

const AccountPage = ({ user }) => {
  const { updateUser } = useAuth();

  // Initial user data
  const initialUserData = {
    name: user.name,
    // dexcomUser: user.dexcomUser,
    // dexcomPass: user.dexcomPass,
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
        {/* <div className="flex items-center">
          <label htmlFor="dexcomUser" className="mr-2">
            Dexcom Username
          </label>
        </div>
        <div>
          <Input type="text" id="dexcomUser" name="dexcomUser" value={userData.dexcomUser} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
        </div>
        <div className="flex items-center">
          <label htmlFor="dexcomPass" className="mr-2">
            Dexcom Password
          </label>
        </div>
        <div>
          <Input type="password" id="dexcomPass" name="dexcomPass" value={userData.dexcomPass} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
        </div> */}
        <div className="flex items-center">
          <label htmlFor="glucagonLocation" className="mr-2">
            Glucagon Location
          </label>
        </div>
        <div>
          <Input type="text" id="glucagonLocation" name="glucagonLocation" value={userData.glucagonLocation} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
        </div>
        <div className="flex items-center">
          <label htmlFor="glucagonType" className="mr-2">
            Glucagon Type
          </label>
        </div>
        <div>
          <Input type="text" id="glucagonType" name="glucagonType" value={userData.glucagonType} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
        </div>
        {/* <div className="flex items-center">
          <label htmlFor="crisisText" className="mr-2">
            Crisis Text
          </label>
        </div>
        <div>
          <Input type="text" id="crisisText" name="crisisText" value={userData.crisisText} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
        </div>
        <div className="flex items-center">
          <label htmlFor="emergencyInfo" className="mr-2">
            Emergency Info
          </label>
        </div>
        <div>
          <Input type="text" id="emergencyInfo" name="emergencyInfo" value={userData.emergencyInfo} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
        </div> */}
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

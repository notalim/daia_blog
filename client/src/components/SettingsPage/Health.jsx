import React, { useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { Input } from "../../@/components/ui/input";
import { Button } from "../../@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@src/@/components/ui/select";

const AccountPage = ({ user }) => {
  const { updateUser } = useAuth();

  // Initial user data
  const initialUserData = {
    name: user?.name,
    // dexcomUser: user?.dexcomUser,
    // dexcomPass: user?.dexcomPass,
    phoneNumber: user?.phoneNumber,
    glucagonLocation: user?.glucagonLocation,
    glucagonType: user?.glucagonType,
    allergies: user?.allergies,
    medications: user?.medications,
    diagnoses: user?.diagnoses,
    crisisText: user?.crisisText,
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
    const { error } = await updateUser(userData.phoneNumber, userData.name, userData.glucagonLocation, userData.glucagonType, userData.allergies, userData.medications, userData.diagnoses, userData.crisisText);
    if (!error) {
    //   console.log("User data updated successfully");
    } else {
      console.error("Error updating user data:", error);
    }
  };

  return (
      <div className="container mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
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
                  <Select
                      value={userData.glucagonType}
                      onValueChange={(value) => {
                          setUserData({ ...userData, glucagonType: value });
                      }}
                      className="w-full"
                  >
                      <SelectTrigger className="w-full">
                          <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="Glucagon Kit">Glucagon Kit</SelectItem>
                          <SelectItem value="Baqsimi">Baqsimi</SelectItem>
                          <SelectItem value="Gvoke HypoPen">Gvoke HypoPen</SelectItem>
                          <SelectItem value="Gvoke Prefilled Syringe (PFS)">Gvoke Prefilled Syringe (PFS)</SelectItem>
                      </SelectContent>
                  </Select>
              </div>

              <div className="flex items-center">
                  <label htmlFor="allergies" className="mr-2">
                      Allergies
                  </label>
              </div>
              <div>
                  <Input type="text" id="allergies" name="allergies" value={userData.allergies} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
              </div>

              <div className="flex items-center">
                  <label htmlFor="medications" className="mr-2">
                      Medications
                  </label>
              </div>
              <div>
                  <Input type="text" id="medications" name="medications" value={userData.medications} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
              </div>

              <div className="flex items-center">
                  <label htmlFor="diagnoses" className="mr-2">
                      Medical Conditions
                  </label>
              </div>
              <div>
                  <Input type="text" id="diagnoses" name="diagnoses" value={userData.diagnoses} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
              </div>

              <div className="col-span-2 flex justify-center">
                  <Button type="submit" variant="daia" className="w-full">
                      Save Changes
                  </Button>
              </div>
          </form>
      </div>
  );
};

export default AccountPage;

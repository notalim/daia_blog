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
        allergies: user.allergies,
        medications: user.medications,
        diagnoses: user.diagnoses,
        crisisText: user.crisisText,
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
        const { error } = await updateUser(
            userData.phoneNumber,
            userData.name,
            userData.glucagonLocation,
            userData.glucagonType,
            userData.allergies,
            userData.medications,
            userData.diagnoses,
            userData.crisisText
        );
        if (!error) {
            console.log("User data updated successfully");
        } else {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div className="w-full lg:w-3/4 px-4">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="crisisText"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Crisis Message
                        </label>
                    </div>
                    <div className="w-full md:w-3/4 px-3">
                        <textarea
                            id="crisisText"
                            name="crisisText"
                            value={user.crisisText}
                            onChange={handleInputChange}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            style={{ height: "100px" }} // Adjust the height as needed
                        ></textarea>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Button type="submit" variant="daia">
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AccountPage;

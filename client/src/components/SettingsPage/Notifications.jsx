import React, { useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { Input } from "../../@/components/ui/input";
import { Button } from "../../@/components/ui/button";
import { Textarea } from "../../@/components/ui/textarea";
import { jwtDecode } from "jwt-decode";

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
            // console.log("User data updated successfully");
        } else {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div className="w-full lg:w-3/4 px-4">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-6">
                    {" "}
                    {/* Flex container for label and textarea */}
                    <div className="flex flex-row items-center">
                        <div className="flex-none w-1/4">
                            {" "}
                            {/* Fixed width for label */}
                            <label htmlFor="crisisText" className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                                Crisis Message
                            </label>
                        </div>
                        <div className="flex-auto pl-3">
                            {" "}
                            {/* Remaining width for textarea */}
                            <Textarea
                                name="crisisText"
                                value={userData.crisisText}
                                onChange={handleInputChange}
                                placeholder="Crisis Message"
                                className="w-full" // Ensure full width is used
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    {" "}
                    {/* Button centered */}
                    <Button type="submit" variant="daia">
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AccountPage;

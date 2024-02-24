import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/useAuth";

import BloodSugarScatterPlot from "../components/BloodSugarScatterPlot";
import ContactList from "../components/ContactList/ContactList";
import ThresholdSlider from "../components/ThresholdSlider/ThresholdSlider";

import moment from "moment";

const UserProfilePage = () => {
    const { user, logoutUser, updateUser, updateDexcomSessionId, deleteUser } =
        useAuth();
    const [dataIsOld, setDataIsOld] = useState(false);
    const [thresholdValue, setThresholdValue] = useState(180);

    const bloodSugarData = user?.bloodSugarData || [];

    // ! set user.thresholdValue at backend later!

    useEffect(() => {
        if (bloodSugarData.length === 0) {
            console.log("No blood sugar data available.");
            setDataIsOld(false);
            return;
        }

        const latestDataTime = moment(
            bloodSugarData[bloodSugarData.length - 1]?.WT
        );
        const thirtyMinutesAgo = moment().subtract(30, "minutes");

        if (latestDataTime.isBefore(thirtyMinutesAgo)) {
            setDataIsOld(true);
        } else {
            setDataIsOld(false);
        }
    }, [bloodSugarData]);

    const handleRefreshData = async () => {
        await updateUser(user.phoneNumber);
        setDataIsOld(false);
    };

    const handleDexcomSessionIdRefresh = async () => {
        await updateDexcomSessionId(
            user.phoneNumber,
            user.dexcomUser,
            user.dexcomPass
        );
    };

    const handleLogout = () => {
        logoutUser();
    };

    const handleDeleteUser = () => {
        deleteUser(user.phoneNumber);
    };

    const handleThresholdSave = (newThreshold) => {
        // TODO: Save the new threshold to the backend
        setThresholdValue(newThreshold);
    };

    // console.log("User: ", user);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Hello, {user.name}!</h1>
            <div className="grid grid-cols-5 my-4 gap-4">
                <div className="col-span-3">
                    <BloodSugarScatterPlot
                        bloodSugarData={bloodSugarData}
                        thresholdValue={thresholdValue}
                        onRefresh={handleRefreshData}
                        dataIsOld={dataIsOld}
                        onDexcomSessionIdRefresh={handleDexcomSessionIdRefresh}
                    />
                </div>
                <div className="col-span-2 bg-lavender-purple p-4 border rounded-lg">
                    <ContactList />
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        User Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Personal details and application.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.name}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Contact number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.phoneNumber}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Dexcom username
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.dexcomUser}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="px-4 py-4 bg-gray-50 text-right sm:px-6">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Log out
                    </button>
                    {/* delete user button */}
                    <button
                        type="button"
                        onClick={handleDeleteUser}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;

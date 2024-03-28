import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/useAuth";

import BloodSugarScatterPlot from "../components/BloodSugarScatterPlot";
import ContactList from "../components/ContactList/ContactList";

import moment from "moment";
import useProcessMessages from "../contexts/useProcessMessages";

const UserDashboardPage = () => {
    const { user, refreshUser, updateDexcomSessionId, updateThresholdValue } = useAuth();
    const [dataIsOld, setDataIsOld] = useState(false);
    const [thresholdValue, setThresholdValue] = useState(
        user.thresholdValue || 180
    );

    const { processError, processSuccess } = useProcessMessages();

    // ! set user.thresholdValue at backend later!

    useEffect(() => {
        if (user.bloodSugarData.length === 0) {
            console.log("No blood sugar data available.");
            setDataIsOld(false);
            return;
        }

        const latestDataTime = moment(
            user.bloodSugarData[user.bloodSugarData.length - 1]?.WT
        );
        const thirtyMinutesAgo = moment().subtract(30, "minutes");
        if (latestDataTime.isBefore(thirtyMinutesAgo)) {
            setDataIsOld(true);
        } else {
            setDataIsOld(false);
        }
    }, [user.bloodSugarData]);

    const handleRefreshData = async () => {
        const { data, error } = await refreshUser(user.phoneNumber);
        if (error) {
            processError(error);
            return;
        }
    };

    const handleDexcomSessionIdRefresh = async () => {
        await updateDexcomSessionId(
            user.phoneNumber,
            user.dexcomUser,
            user.dexcomPass
        );
    };

    const handleDeleteUser = () => {
        deleteUser(user.phoneNumber);
    };

    const handleThresholdChange = (event) => {
        setThresholdValue(event.target.value);
    };

    const handleSaveThreshold = async () => {
        const result = await updateThresholdValue(
            user.phoneNumber,
            thresholdValue
        );
        if (result.success) {
            processSuccess("Threshold updated successfully.");
        } else {
            processError("Error updating threshold.");
        }
    };

    const bloodSugarData = user.bloodSugarData;
    return (
        <div className="container mx-auto m-8">
            <h1 className="text-2xl font-bold">Hello, {user.name}!</h1>

            <BloodSugarScatterPlot
                bloodSugarData={bloodSugarData}
                thresholdValue={thresholdValue}
                onRefresh={handleRefreshData}
                dataIsOld={dataIsOld}
                onDexcomSessionIdRefresh={handleDexcomSessionIdRefresh}
                onThresholdChange={handleThresholdChange}
                onSaveThreshold={handleSaveThreshold}
            />

            <div className="my-4">
                <label
                    htmlFor="thresholdInput"
                    className="block text-sm font-medium text-gray-700"
                >
                    Set your threshold:
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                        type="number"
                        name="threshold"
                        id="thresholdInput"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                        value={thresholdValue}
                        onChange={handleThresholdChange}
                    />
                    <button
                        type="button"
                        className="ml-2 inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mid-purple hover:bg-full-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleSaveThreshold}
                    >
                        Save Threshold
                    </button>
                </div>
            </div>

            <ContactList />
        </div>
    );
};

export default UserDashboardPage;

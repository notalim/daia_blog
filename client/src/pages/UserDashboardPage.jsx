import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/useAuth";

import BloodSugarScatterPlot from "../components/BloodSugarScatterPlot";
import ContactList from "../components/ContactList/ContactList";
import ThresholdSlider from "../components/ThresholdSlider/ThresholdSlider";

import moment from "moment";

import UserInformation from "../components/UserInformation";

import useProcessMessages from "../contexts/useProcessMessages";

const UserDashboardPage = () => {
    const { user, refreshUser, updateDexcomSessionId } = useAuth();
    const [dataIsOld, setDataIsOld] = useState(false);
    const [thresholdValue, setThresholdValue] = useState(180);

	const { processError } = useProcessMessages();

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

        // console.log(`Latest Data Time: ${latestDataTime}`);
        // console.log(`Thirty Minutes Ago: ${thirtyMinutesAgo}`);
        // console.log(
        //     `Is latest data time before thirty minutes ago? ${latestDataTime.isBefore(
        //         thirtyMinutesAgo
        //     )}`
        // );

        if (latestDataTime.isBefore(thirtyMinutesAgo)) {
            setDataIsOld(true);
        } else {
            setDataIsOld(false);
        }
    }, [user.bloodSugarData]);

    const handleRefreshData = async () => {
        console.log("Refreshing user: ", user);
        // set user's bloodsugardata to the new data

        const { data, error } = await refreshUser(user.phoneNumber);
		if (error) {
			processError(error);
			return;
		}

		console.log("Data: ", data);

		


    };

    const handleDexcomSessionIdRefresh = async () => {
        await updateDexcomSessionId(
            user.phoneNumber,
            user.dexcomUser,
            user.dexcomPass
        );
    };

    const handleThresholdSave = (newThreshold) => {
        // TODO: Save the new threshold to the backend
        setThresholdValue(newThreshold);
    };

    const bloodSugarData = user.bloodSugarData;

    // console.log("User: ", user);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center sm:text-left">
                Hello, {user.name}!
            </h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-3">
                    <BloodSugarScatterPlot
                        bloodSugarData={bloodSugarData}
                        thresholdValue={thresholdValue}
                        onRefresh={handleRefreshData}
                        dataIsOld={dataIsOld}
                        onDexcomSessionIdRefresh={handleDexcomSessionIdRefresh}
                    />
                </div>
                <div className="md:col-span-2 bg-lavender-purple p-4 border rounded-lg">
                    <ContactList />
                </div>
            </div>
        </div>
    );
};

export default UserDashboardPage;

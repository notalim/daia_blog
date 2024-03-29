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
        user.lowAlarm || 180
    );

    const { processError, processSuccess } = useProcessMessages();
	
    useEffect(() => {
        if (!user.bloodSugarData || user.bloodSugarData.length === 0) {
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

    const handleThresholdChange = (event) => {
        setThresholdValue(event.target.value);
    };

    const handleSaveThreshold = async () => {
        const result = await updateThresholdValue(
            user.phoneNumber,
            parseInt(thresholdValue)
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
            <ContactList />
        </div>
    );
};

export default UserDashboardPage;

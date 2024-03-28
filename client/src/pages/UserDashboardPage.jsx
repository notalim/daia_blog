import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/useAuth";
import BloodSugarScatterPlot from "../components/BloodSugarScatterPlot";
import ContactList from "../components/ContactList/ContactList";
import moment from "moment";

const UserDashboardPage = () => {
    const { user, refreshUser, updateDexcomSessionId } = useAuth();
    const [dataIsOld, setDataIsOld] = useState(false);
    const [thresholdValue, setThresholdValue] = useState(180);

    useEffect(() => {
        if (user.bloodSugarData.length === 0) {
            console.log("No blood sugar data available.");
            setDataIsOld(false);
            return;
        }

        const latestDataTime = moment(user.bloodSugarData[user.bloodSugarData.length - 1]?.WT);
        const thirtyMinutesAgo = moment().subtract(30, "minutes");

        if (latestDataTime.isBefore(thirtyMinutesAgo)) {
            setDataIsOld(true);
        } else {
            setDataIsOld(false);
        }
    }, [user.bloodSugarData]);

    const handleRefreshData = async () => {
        // Refresh logic here
    };

    const bloodSugarData = user.bloodSugarData;

    return (
        <div className="container mx-auto px-4 lg:px-8 my-8 max-w-7xl">
            <h1 className="text-2xl font-bold mb-8">Hello, {user.name}!</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-3/5">
                    <BloodSugarScatterPlot
                        bloodSugarData={bloodSugarData}
                        thresholdValue={thresholdValue}
                        onRefresh={handleRefreshData}
                        dataIsOld={dataIsOld}
                    />
                </div>
                <div className="w-full lg:w-2/5 bg-lavender-purple p-4 border rounded-lg">
                    <ContactList />
                </div>
            </div>
        </div>
    );
};

export default UserDashboardPage;

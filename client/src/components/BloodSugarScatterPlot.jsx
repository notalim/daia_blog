import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import { setupChart } from "../config/graphConfig";
import { processData } from "../helpers/graphHelpers";

import { Button } from "@src/@/components/ui/button";
import { Input } from "@src/@/components/ui/input";

const BloodSugarScatterPlot = ({
    bloodSugarData,
    onRefresh,
    dataIsOld,
    onDexcomSessionIdRefresh,
    thresholdValue,
    onThresholdChange,
    onSaveThreshold,
}) => {
    Chart.register(annotationPlugin);
    const chartRef = useRef();
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!bloodSugarData || bloodSugarData.length === 0) return;
        const ctx = chartRef.current.getContext("2d");

        const processedData = processData(bloodSugarData);
        const realDataPoints = processedData.filter((point) => !point.missing);
        const ghostDataPoints = processedData.filter((point) => point.missing);

        const chartConfig = setupChart(
            realDataPoints,
            ghostDataPoints,
            thresholdValue
        );

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, chartConfig);

        return () => {
            chartInstance.current?.destroy();
        };
    }, [bloodSugarData, thresholdValue]);

    return (
        <div className="w-full mx-auto">
            {dataIsOld && (
                <div className="bg-lavender-purple border-l-4 border-peach text-mid-purple p-4 mb-4" role="alert">
                    <p>The data is older than 30 minutes, would you like to update?</p>
                    <button onClick={onRefresh} className="bg-peach text-white font-bold py-2 px-4 rounded">
                        Refresh Data
                    </button>
                </div>
            )}
            {/* refresh button with an icon */}

            <canvas ref={chartRef} className="my-4" />
            <div className="flex flex-col items-center justify-center my-8">
                <div className="flex items-center space-x-4 mb-4">
                    <label htmlFor="thresholdInput" className="text-lg font-semibold text-gray-900">
                        Set Low Alarm:
                    </label>

                    <Input
                        id="thresholdInput"
                        type="number"
                        min="0"
                        max="199"
                        value={thresholdValue}
                        onChange={onThresholdChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2 text-center"
                    ></Input>

                    <Button onClick={onSaveThreshold} variant="daia" className="w-24">
                        Save
                    </Button>
                </div>
                <div className="text-xs text-gray-500">Low Alarm can be set to any value between 0 and 200.</div>

                <Button onClick={onDexcomSessionIdRefresh} variant="daia" className="mt-2">
                    Refresh Points Data
                </Button>
                <div className="text-xs text-gray-500 mt-2">Fetch the latest data from Dexcom.</div>
            </div>

            <div className="text-sm p-4 border rounded-lg bg-lavender-purple">
                <p className="font-bold">Understanding the Chart:</p>
                <ul className="list-disc pl-5">
                    <li>
                        <span className="text-mid-purple font-bold">Tracked Points: </span>
                        Values fetched directly from Dexcom.
                    </li>
                    <li>
                        <span className="text-gray-500 font-bold">Ghost Points: </span>
                        Data completed by Daia in case Dexcom doesn't provide a value.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BloodSugarScatterPlot;

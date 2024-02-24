import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";

import moment from "moment-timezone";
import "chartjs-adapter-moment";

const BloodSugarScatterPlot = ({
    bloodSugarData,
    onRefresh,
    dataIsOld,
    onSaveThreshold,

    onDexcomSessionIdRefresh,
}) => {
    Chart.register(annotationPlugin);

    function createGhostPoint(time, y = null) {
        return {
            x: time.format("YYYY-MM-DDTHH:mm:ss"),
            y: y,
            missing: true,
        };
    }

    function interpolateY(currentTime, momentData) {
        // Find the closest point before the current time
        let beforePoint = null;
        let afterPoint = null;

        for (let i = 0; i < momentData.length; i++) {
            if (moment(momentData[i].moment).isBefore(currentTime)) {
                beforePoint = momentData[i];
            } else if (
                moment(momentData[i].moment).isAfter(currentTime) &&
                afterPoint == null
            ) {
                afterPoint = momentData[i];
                break; // Found the immediate next point, exit the loop
            }
        }

        // Ensure we have valid points to interpolate between
        if (beforePoint && afterPoint) {
            let slope =
                (afterPoint.Value - beforePoint.Value) /
                moment(afterPoint.moment).diff(
                    moment(beforePoint.moment),
                    "milliseconds"
                );
            let interpolatedY =
                beforePoint.Value +
                slope *
                    currentTime.diff(
                        moment(beforePoint.moment),
                        "milliseconds"
                    );

            return Math.round(interpolatedY);
        }

        // If we can't interpolate, return null
        return null;
    }

    function processData(data) {
        const intervalCount = 12; // The number of data points we expect
        const expectedInterval = 5 * 60 * 1000; // 5 minutes in milliseconds
        const results = [];

        const validData = data.filter((entry) => entry != null);

        // Sort the incoming data by time
        const sortedData = validData
            .map((dp) => ({
                ...dp,
                moment: moment(dp.WT),
                Value: dp.Value,
            }))
            .sort((a, b) => a.moment.valueOf() - b.moment.valueOf());

        // The end time is the last data point's time
        const endTime =
            sortedData.length > 0
                ? sortedData[sortedData.length - 1].moment
                : moment();
        const startTime = endTime
            .clone()
            .subtract((intervalCount - 1) * expectedInterval, "milliseconds");

        let lastKnownValue = null;
        for (let i = 0; i < intervalCount; i++) {
            let expectedTime = startTime
                .clone()
                .add(i * expectedInterval, "milliseconds");

            let realPoint = sortedData.find((d) =>
                moment(d.moment).isSame(expectedTime, "minute")
            );
            if (realPoint) {
                results.push({
                    x: realPoint.moment.format("YYYY-MM-DDTHH:mm:ss"),
                    y: realPoint.Value,
                    missing: false,
                });
                lastKnownValue = realPoint.Value;
            } else {
                let interpolatedY = interpolateY(expectedTime, sortedData);
                if (interpolatedY !== null) {
                    results.push(createGhostPoint(expectedTime, interpolatedY));
                } else if (lastKnownValue !== null) {
                    results.push(
                        createGhostPoint(expectedTime, lastKnownValue)
                    );
                } else {
                    // If there's no last known value, we have no basis to create a ghost point, so do nothing
                    // This should only happen if there's no data at the start of the hour
                }
            }
        }

        // If we have less than 12 points, it means we're missing data at the start of the hour
        while (results.length < intervalCount) {
            let timeToAdd = moment(results[0].x).subtract(
                expectedInterval,
                "milliseconds"
            );

            results.unshift(createGhostPoint(timeToAdd, lastKnownValue)); // Use the last known value or null
        }

        return results;
    }

    // const handleThresholdChange = (newThreshold) => {
    //     console.log("New threshold set to:", newThreshold);
    //     setThresholdValue(newThreshold);
    // };

    // const handleThresholdSave = (newThreshold) => {
    //     onSaveThreshold(newThreshold);
    // };

    const chartRef = useRef();
    const chartInstance = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const [thresholdValue, setThresholdValue] = useState(150);

    useEffect(() => {
        if (!bloodSugarData || bloodSugarData.length === 0) return;
        const ctx = chartRef.current.getContext("2d");

        // Calculate one hour ago from the current time
        const oneHourAgo = moment().subtract(1, "hour");

        // Filter the bloodSugarData to only include the data from the last hour
        // const lastHourData = bloodSugarData.filter((data) => {
        //     return moment(data.WT).isAfter(oneHourAgo);
        // });

        const processedData = processData(bloodSugarData).filter(
            (d) => d.x != null
        );

        // console.log("Processed Data: ", processedData);

        const realDataPoints = processedData.filter((point) => !point.missing);
        const ghostDataPoints = processedData.filter((point) => point.missing);

        const data = {
            datasets: [
                {
                    label: "Tracked Points",
                    data: realDataPoints,
                    pointRadius: 4,
                    pointBackgroundColor: "#8971B7",
                    pointBorderColor: "transparent",
                    pointHoverRadius: 8,
                    pointHoverBorderColor: "black",
                },

                {
                    label: "Ghost Points",
                    data: ghostDataPoints,
                    pointRadius: 2,
                    pointBackgroundColor: "grey",
                    pointBorderColor: "grey",
                    pointHoverRadius: 8,
                },
            ],
        };

        const options = {
            responsive: true,
            tooltips: {
                enabled: true,
                mode: "nearest",
                callbacks: {
                    label: function (tooltipItem, data) {
                        const dataset = data.datasets[tooltipItem.datasetIndex];
                        const point = dataset.data[tooltipItem.index];
                        if (point.missing) {
                            return "Ghost points: Data completed by DAIA";
                        } else {
                            return `Tracked points: Value from Dexcom - ${tooltipItem.yLabel} mg/dL`;
                        }
                    },
                },
            },
            plugins: {
                annotation: {
                    annotations: {
                        thresholdLine: {
                            type: "line",
                            yMin: thresholdValue,
                            yMax: thresholdValue,
                            borderColor: "#C185A3",
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                content: "Threshold: " + thresholdValue,
                                enabled: true,
                                position: "start",
                            },
                        },
                    },
                },
            },
            legend: {
                display: true,
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: "black",
                },
            },
            scales: {
                x: {
                    type: "time",
                    time: {
                        unit: "minute",
                        tooltipFormat: "HH:mm",
                    },
                    ticks: {
                        source: "data",
                    },
                },
                y: {
                    id: "y-axis-0",
                    beginAtZero: false,
                    suggestedMin: 40,
                    suggestedMax: 400,
                },
            },
        };

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const destroyChart = () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };

        chartInstance.current = new Chart(ctx, {
            type: "scatter",
            data: data,
            options: options,
        });

        return () => {
            chartInstance.current?.destroy();
        };
    }, [bloodSugarData, thresholdValue]);

    return (
        <div className="w-full mx-auto">
            {dataIsOld && (
                <div
                    className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
                    role="alert"
                >
                    <p>
                        The data is older than 30 minutes, would you like to
                        update?
                    </p>
                    <button
                        onClick={onRefresh}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Refresh Data
                    </button>
                </div>
            )}
            {/* refresh button with an icon */}

            <canvas ref={chartRef} className="my-4" />

            <button
                onClick={onRefresh}
                className="bg-mid-purple hover:bg-full-purple text-white font-bold py-2 px-2 rounded mb-4 mx-2 transition duration-300 ease-in-out"
            >
                {/* need an icon! */}
                Refresh Data
            </button>

            <button
                onClick={onDexcomSessionIdRefresh}
                className="bg-mid-purple hover:bg-full-purple text-white font-bold py-2 px-2 rounded mb-4 mx-2 transition duration-300 ease-in-out"
            >
                {/* need an icon! */}
                Refresh Dexcom session ID (TEST){" "}
            </button>

            <div className="text-sm p-4 border rounded-lg bg-lavender-purple">
                <p className="font-bold">Understanding the Chart:</p>
                <ul className="list-disc pl-5">
                    <li>
                        <span className="text-mid-purple font-bold">
                            Tracked Points:{" "}
                        </span>
                        Values fetched directly from Dexcom.
                    </li>
                    <li>
                        <span className="text-gray-500 font-bold">
                            Ghost Points:{" "}
                        </span>
                        Data completed by DAIA in case Dexcom doesn't provide a
                        value.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BloodSugarScatterPlot;

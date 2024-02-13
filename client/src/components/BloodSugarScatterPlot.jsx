import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import moment from "moment-timezone";
import "chartjs-adapter-moment";

const BloodSugarScatterPlot = ({
    bloodSugarData,
    thresholdValue,
    onRefresh,
    dataIsOld,
}) => {
    const chartRef = useRef();
    const chartInstance = useRef(null);

    function createGhostPoint(time, y = null) {
        return {
            x: time.format("YYYY-MM-DDTHH:mm:ss"),
            y: y,
            missing: true,
        };
    }

    function interpolateY(time, data) {
        let beforePoint = data.find((d) => moment(d.WT).isBefore(time));
        let afterPoint = data.find((d) => moment(d.WT).isAfter(time));

        // * See linear interpolation formula
        let slope =
            (afterPoint.Value - beforePoint.Value) /
            moment(afterPoint.WT).diff(moment(beforePoint.WT));
        let interpolatedY =
            slope * moment(time).diff(moment(beforePoint.WT)) +
            beforePoint.Value;

        return Math.round(interpolatedY);
    }

    function processData(data) {
        const expectedInterval = 5 * 60 * 1000; // 5 minutes in milliseconds
        const results = [];
        const currentTime = moment(); // current time
        const startTime = currentTime.clone().subtract(55, "minutes"); // start time for 12 points (5 minutes interval)

        // Convert data points to moments for easier comparison
        const momentData = data.map((dp) => ({
            ...dp,
            moment: moment(parseInt(dp.WT.replace(/[^0-9]/g, ""), 10)),
        }));

        // Sort data points by time
        momentData.sort((a, b) => a.moment.valueOf() - b.moment.valueOf());

        let dataIndex = momentData.findIndex((dp) =>
            dp.moment.isSameOrAfter(startTime)
        );

        // If there's no data point after the start time, set the index to the end of the array
        if (dataIndex === -1) {
            dataIndex = momentData.length;
        }

        for (
            let time = startTime;
            time.isSameOrBefore(currentTime);
            time.add(5, "minutes")
        ) {
            if (
                dataIndex < momentData.length &&
                momentData[dataIndex].moment.isSameOrBefore(time)
            ) {
                // If there's a data point for the current time, add it
                results.push({
                    x: time.format("YYYY-MM-DDTHH:mm:ss"),
                    y: momentData[dataIndex].Value,
                    missing: false,
                });
                dataIndex++; // move to the next data point for the next iteration
            } else {
                // Cases where data is missing
                if (time.isBefore(moment(data[0].WT))) {
                    // Case 1: Missing points on the left
                    results.push(createGhostPoint(time, data[0].Value));
                } else if (time.isAfter(moment(data[data.length - 1].WT))) {
                    // Case 3: Missing points on the right
                    results.push(
                        createGhostPoint(time, data[data.length - 1].Value)
                    );
                } else {
                    // Case 2: Missing points in between
                    let interpolatedY = interpolateY(time, data);
                    results.push(createGhostPoint(time, interpolatedY));
                }
            }
        }

        return results;
    }

    useEffect(() => {
        if (!bloodSugarData || bloodSugarData.length === 0) return;
        const ctx = chartRef.current.getContext("2d");

        let dataCopy = [...bloodSugarData];

        const now = moment();
        if (
            dataCopy.length > 0 &&
            now.diff(moment(dataCopy[dataCopy.length - 1].WT), "minutes") < 5
        ) {
            dataCopy.pop();
        }

        const processedData = processData(dataCopy);

        console.log("Processed Data: ", processedData);

        const data = {
            datasets: [
                {
                    label: "Blood Sugar Level (mg/dL)",
                    data: processedData,
                    pointRadius: (context) => (context.raw.missing ? 2 : 4),
                    pointBackgroundColor: (context) =>
                        context.raw.missing ? "grey" : "rgba(187, 169, 221, 1)",

                    pointBorderColor: "rgba(86, 56, 144, 1)",
                    pointHoverRadius: 8,
                },
            ],
        };

        const options = {
            tooltips: {
                enabled: true,
                mode: "nearest",
                callbacks: {
                    label: function (tooltipItem, data) {
                        const dataset = data.datasets[tooltipItem.datasetIndex];
                        const point = dataset.data[tooltipItem.index];
                        if (point.missing) {
                            return "Data not available for this time";
                        }
                        return `${dataset.label}: ${tooltipItem.yLabel} mg/dL`;
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

        // Clean up the Chart instance on component unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [bloodSugarData, thresholdValue]);

    return (
        <div className="w-full lg:w-3/5 mx-auto">
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
            <button
                onClick={onRefresh}
                className="bg-full-purple hover:hover-full-purple text-white font-bold py-2 px-4 rounded mb-4"
            >
                {/* need an icon! */}
                Refresh Data
            </button>

            <canvas ref={chartRef} />
        </div>
    );
};

export default BloodSugarScatterPlot;

import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import moment from "moment-timezone";
import "chartjs-adapter-moment";

const BloodSugarScatterPlot = ({ bloodSugarData, thresholdValue }) => {
    const chartRef = useRef();
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!bloodSugarData || bloodSugarData.length === 0) return; 
        const ctx = chartRef.current.getContext("2d");

        // ! Fix to get the data from backend instead of context

        console.log(bloodSugarData);

        const convertedData = bloodSugarData.slice(-12).map(({ WT, Value }) => ({
            x: moment(
                parseInt(WT.replace("Date(", "").replace(")", ""), 10)
            ).format("YYYY-MM-DDTHH:mm:ss"),
            y: Value,
        }));

        const data = {
            datasets: [
                {
                    label: "Blood Sugar Level (mg/dL)",
                    data: convertedData,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(187, 169, 221, 1)",
                    pointBorderColor: "rgba(86, 56, 144, 1)",
                    pointHoverRadius: 8,
                },
            ],
        };

        const options = {
            scales: {
                x: {
                    type: "time",
                    bounds: "ticks",
                    time: {
                        parser: "YYYY-MM-DDTHH:mm:ss",
                        tooltipFormat: "HH:mm",
                        unit: "minute",
                        stepSize: 5,
                        displayFormats: {
                            minute: "HH:mm",
                        },
                    },
                    ticks: {
                        stepSize: 5,
                        autoSkip: true,
                        maxRotation: 0,
                        minRotation: 0,
                        source: "data",
                        autoSkipPadding: 15,
                        // If you know the exact range of your data, you can uncomment the following lines
                        // and adjust them to set the minimum and maximum values to align with the 5-minute interval
                        // min: moment().startOf('hour').toDate(), // Adjust this to the start of your data range
                        // max: moment().endOf('hour').toDate(), // Adjust this to the end of your data range
                    },
                    grid: {
                        display: true,
                    },
                    title: {
                        display: true,
                        text: "Time (EST)",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Blood Sugar Level (mg/dL)",
                    },
                },
            },
        };

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
            <canvas ref={chartRef} />
        </div>
    );
};

export default BloodSugarScatterPlot;

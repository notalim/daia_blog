import React from "react";
import { Scatter } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	TimeScale, // Import TimeScale from Chart.js
	TimeSeriesScale, // TimeSeriesScale may be required depending on the version
} from "chart.js";
import "chartjs-adapter-date-fns"; // Import the adapter

// Register the components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	TimeScale,
	TimeSeriesScale // Register TimeSeriesScale if necessary
);

// ... rest of your component

const BloodSugarGraph = ({ data }) => {
	// Assuming `data` is an array of objects with `time` and `level` properties
	const dataSet = {
		datasets: [
			{
				label: "Blood Sugar Level",
				data: data.map((item) => ({
					x: new Date(`2023-01-01T${item.time}:00`),
					y: item.level,
				})),
				backgroundColor: "rgba(147, 112, 219, 0.5)",
				borderColor: "rgba(147, 112, 219, 1)",
				borderWidth: 1,
				pointRadius: 5,
				pointHoverRadius: 7,
			},
		],
	};

	const options = {
		scales: {
			x: {
				type: "time",
				time: {
					unit: "minute",
					tooltipFormat: "HH:mm",
				},
				title: {
					display: true,
					text: "Time",
				},
			},
			y: {
				title: {
					display: true,
					text: "Blood Sugar (mg/dL)",
				},
				beginAtZero: true,
				grace: "5%",
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						return `Blood Sugar: ${context.parsed.y} mg/dL`;
					},
				},
			},
		},
		maintainAspectRatio: false,
	};

	return (
		<div style={{ position: "relative", height: "40vh", width: "80vw" }}>
			<Scatter data={dataSet} options={options} />
		</div>
	);
};

export default BloodSugarGraph;

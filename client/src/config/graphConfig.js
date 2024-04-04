import annotationPlugin from "chartjs-plugin-annotation";

export const setupChart = (realDataPoints, ghostDataPoints, thresholdValue) => {
    return {
        type: "scatter",
        data: {
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
                    pointBackgroundColor: "#F8AF91",
                    pointBorderColor: "transparent",
                    pointHoverRadius: 8,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        fontColor: "black",
                    },
                },
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
        },
        plugins: [annotationPlugin],
    };
};

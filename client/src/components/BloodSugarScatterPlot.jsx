import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import moment from 'moment-timezone';
import 'chartjs-adapter-moment';

const BloodSugarScatterPlot = ({ bloodSugarData, thresholdValue }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!bloodSugarData || bloodSugarData.length === 0) return; // Don't render the chart if data is empty
    const ctx = chartRef.current.getContext('2d');

    const convertedData = bloodSugarData.map(({ WT, Value }) => ({
      x: moment(parseInt(WT.replace('Date(', '').replace(')', ''), 10)).format('YYYY-MM-DDTHH:mm:ss'),
      y: Value,
    }));

    const data = {
      datasets: [
        {
          label: 'Blood Sugar Level (mg/dL)',
          data: convertedData,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(187, 169, 221, 1)',
          pointBorderColor: 'rgba(86, 56, 144, 1)',
          pointHoverRadius: 8,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'minute',
            displayFormats: {
              minute: 'HH:mm',
            },
          },
          title: {
            display: true,
            text: 'Time (EST)',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Blood Sugar Level (mg/dL)',
          },
        },
      }
    };

    // Destroy the previous Chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new Chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'scatter',
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
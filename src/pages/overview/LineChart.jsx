import React from 'react';
import {
    Chart as ChartJS,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const options = {
    responsive: true,
    elements: {
        point: {
            radius: 0,
            hitRadius: 10,
        }
    },
    plugins: {
        title: {
            display: false,
            text: 'Chart.js Line Chart - Cubic interpolation mode'
        },
        legend: {
            display: false,
        },
    },
    interaction: {
        intersect: false,
    },
    scales: {
        x: {
            display: false,
            title: {
                display: true
            }
        },
        y: {
            display: false,
            title: {
                display: true,
                text: 'Value'
            },
            suggestedMin: -10,
            suggestedMax: 200
        }
    }
};

const datapoints = [10, 20, 150, 80, 40, 80];
const DATA_COUNT = datapoints.length;
const labels = Array.from({ length: DATA_COUNT }, (_, i) => i.toString());

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Cubic interpolation',
            data: datapoints,
            borderColor: '#E79B38',
            backgroundColor: '#E79B38',
            fill: true,
            tension: 0.4
        },
    ]
};

const LineChart = () => (
    <Line options={options} data={data} />
);

export default LineChart;

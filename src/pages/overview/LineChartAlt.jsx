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
            display: true,
            text: 'Blood Sugar'
        },
        legend: {
            display: false,
            labels: {
                font: {
                    family: 'Comic Sans MS',
                }
            }
        },
    },
    interaction: {
        intersect: false,
    },
    scales: {
        x: {
            display: true,
            title: {
                display: true
            }
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Value'
            },
            suggestedMin: 0,
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
            data: datapoints,
            borderColor: '#8793EA',
            fill: false,
            tension: 0.4
        },
    ]
};

const LineChart = () => (
    <Line options={options} data={data} />
);

export default LineChart;

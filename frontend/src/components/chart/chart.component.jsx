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
} from "chart.js";
import { Line } from "react-chartjs-2";
// import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      // position: "top", // Change the legend position to the left
    },
    title: {
      display: true,
      position: "top", // Change the title position to the left
      // text: <img src="your-logo.png" alt="Logo" style="width: 30px; margin-right: 10px;">BTC/USD,
      // text: "BTC/USD",
    },
    layout: {
      padding: {
        left: 80, // Add margin to the top
      },
    },
  },

  elements: {
    point: {
      radius: 0, // Remove pointer dots at each value
    },
  },
  scales: {
    x: {
      display: true, // Hide the x-axis
      grid: {
        display: false, // Hide y-axis grid lines
      },
    },
    y: {
      // max: 3, // Limit the number of displayed y-axis values to 3
      // min: 0, // Set a minimum value (adjust as needed)
      // beginAtZero: true,
      display: false, // Display the y-axis
      // position: "left", // Position the y-axis on the left
    },
  },
  // layout: {
  //   padding: {
  //     left: -60, // Add margin to the top
  //   },
  // },
};

const labels = [
  "24H",
  "1D",
  "1W",
  "1M",
  "6M",
  "1Y",
  // "July",
  // "Aug",
  // "Sep",
  // "Oct",
  // "Nov",
  // "Dec",
];
// const labels = ["7D", "30D"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      // borderColor: "rgb(53, 162, 235)",
      borderColor: "#44441d",
      // backgroundColor: "rgba(53, 162, 235, 0.5)",
      // backgroundColor: "#44441d91",
      tension: 0.4, // Make the line curvy
      // pointRadius: 4, // Set the radius for data points
      // borderWidth: 0, // Remove the line inside the chart
    },
  ],
};

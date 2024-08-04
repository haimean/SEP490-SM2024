import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Giờ sử dụng",
        data: data.usage,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        label: "Lượt đặt",
        data: data.bookings,
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số giờ/Lượt đặt',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;

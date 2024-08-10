import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { BarChart } from "@mui/x-charts/BarChart";
// Đăng ký các thành phần cần thiết
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarHostChart = ({ data }) => {
  return (
    <BarChart
      series={[
        { data: data.usage, label: "Giờ đặt" },
        { data: data.bookings, label: "Lượt đặt" },
      ]}
      height={350}
      xAxis={[{ data: data.labels, scaleType: "band" }]}
    />
  );
};

export default BarHostChart;

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const labels = ["Host", "Admin", "Player"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Số lượng",
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 206, 86)",
      ],
      // Use a lighter border color for a subtle effect
      borderColor: "rgba(0,0,255,0.2)",
      // Set a thinner border width
      borderWidth: 1,
      data: [30, 35, 35],
    },
  ],
};

const PieChart = React.memo(() => {
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
});
PieChart.displayName = "PieChart";

export default PieChart;

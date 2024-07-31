import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import CallApi from "../../../service/CallAPI";
Chart.register(ArcElement);

const PieChart = React.memo(() => {
  const [dataAccount, setDataAccount] = useState({});
  const labels = ["Admin", "Host", "Player"];
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
        data: [
          dataAccount?.totalAdmin || 30,
          dataAccount?.totalHost || 30,
          dataAccount?.totalPlayer || 30,
        ],
      },
    ],
  };
  const getDataAccount = async () => {
    try {
      const result = await CallApi("/api/admin/account/get-all", "get");
      setDataAccount(result?.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  useEffect(() => {
    getDataAccount();
  }, []);
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
});
PieChart.displayName = "PieChart";

export default PieChart;

import { BarChart } from "@mui/x-charts/BarChart";
import CallApi from "../../../service/CallAPI";
import { useEffect, useState } from "react";

export default function BarChartForAccountAdmin() {
  const [seriesData, setSeriesData] = useState({
    series: [],
    labels: [],
  });

  const getData = async () => {
    try {
      const result = await CallApi(
        "/api/admin/account/get-all-account-12-month-latest",
        "get"
      );
      console.log("🚀 ========= result:", result);
      processData(result.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  const processData = (data) => {
    const hostData = data.map((item) => item.host);
    const playerData = data.map((item) => item.player);
    const labels = data.map((item) => item.label);

    setSeriesData({
      series: [
        { data: hostData, label: "Chủ cơ sở" },
        { data: playerData, label: "Người chơi" },
      ],
      labels: labels,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BarChart
      series={seriesData.series}
      height={290}
      xAxis={[
        {
          data: seriesData.labels,
          scaleType: "band",
        },
      ]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}

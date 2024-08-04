import CallApi from "../../../service/CallAPI";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";

export default function LineChartForAccountAdmin({
  optionMonth,
  optionWeek,
  optionChartPlayer,
}) {
  console.log("🚀 ========= optionWeek:", optionWeek);
  const [seriesData, setSeriesData] = useState({
    series: [],
    labels: [],
  });
  const [seriesWeekData, setSeriesWeekData] = useState({
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
  const getWeekData = async () => {
    try {
      const result = await CallApi(
        "/api/admin/account/get-all-account-with-date",
        "post",
        {
          dateFilter: optionWeek,
        }
      );
      console.log("🚀 ========= result:", result);
      processWeekData(result.data);
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
        { data: hostData.slice(-optionMonth), label: "Chủ cơ sở" },
        { data: playerData.slice(-optionMonth), label: "Người chơi" },
      ],
      labels: labels.slice(-optionMonth),
    });
  };
  const processWeekData = (data) => {
    const hostData = data.map((item) => item.host);
    const playerData = data.map((item) => item.player);
    const labels = data.map((item) => item.label);
    setSeriesWeekData({
      series: [
        { data: hostData, label: "Chủ cơ sở" },
        { data: playerData, label: "Người chơi" },
      ],
      labels: labels,
    });
  };
  useEffect(() => {
    getData();
  }, [optionMonth]);

  useEffect(() => {
    getWeekData();
  }, [optionWeek]);
  return optionChartPlayer == "week" ? (
    <LineChart
      series={seriesWeekData.series}
      height={290}
      xAxis={[
        {
          data: seriesWeekData.labels,
          scaleType: "band",
        },
      ]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  ) : (
    <LineChart
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

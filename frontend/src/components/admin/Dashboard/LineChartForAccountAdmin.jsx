import CallApi from "../../../service/CallAPI";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";

export default function LineChartForAccountAdmin({
  optionMonth,
  optionMonthChange,
  optionChartPlayer,
  optionYear,
}) {
  const [data, setData] = useState(false);
  const [dataMonth, setDataMonth] = useState(false);
  const [seriesData, setSeriesData] = useState({
    series: [],
    labels: [],
  });
  const [seriesDataInMonth, setSeriesDataInMonth] = useState({
    series: [],
    labels: [],
  });
  const getData = async () => {
    try {
      const result = await CallApi(
        "/api/admin/account/get-all-account-12-month-latest",
        "get"
      );
      setData(false);
      processData(result.data);
    } catch (error) {
      setData(true);
      console.log("🚀 ========= error:", error);
    }
  };
  const getDataMonth = async () => {
    try {
      const result = await CallApi(
        "/api/admin/account/get-all-account-in-month",
        "post",
        {
          dateFilter: `${optionYear}-${optionMonthChange}`,
        }
      );
      setDataMonth(false);
      processDataMonth(result.data);
    } catch (error) {
      setDataMonth(true);
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
  const processDataMonth = (data) => {
    const hostData = data.map((item) => item.host);
    const playerData = data.map((item) => item.player);
    const labels = data.map((item) => item.label);
    setSeriesDataInMonth({
      series: [
        { data: hostData, label: "Chủ cơ sở" },
        { data: playerData, label: "Người chơi" },
      ],
      labels: labels,
    });
  };
  useEffect(() => {
    getDataMonth();
  }, [optionMonthChange, optionYear]);
  useEffect(() => {
    getData();
  }, [optionMonth]);

  return optionChartPlayer == "week" ? (
    dataMonth ? (
      <p>Không có dữ liệu</p>
    ) : (
      <LineChart
        series={seriesDataInMonth.series}
        height={290}
        xAxis={[
          {
            data: seriesDataInMonth.labels,
            scaleType: "band",
          },
        ]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    )
  ) : data ? (
    <p>Không có dữ liệu</p>
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

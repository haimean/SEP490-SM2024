import { BarChart } from "@mui/x-charts/BarChart";
import CallApi from "../../../service/CallAPI";
import { useEffect, useState } from "react";

export default function BarChartForBookingAndPostAdmin() {
  const [seriesData, setSeriesData] = useState({
    series: [],
    labels: [],
  });

  const getData = async () => {
    try {
      const result = await CallApi(
        "/api/admin/booking/get-all-booking-and-post-12-month-latest",
        "get"
      );
      console.log("🚀 ========= result:", result);
      processData(result.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  const processData = (data) => {
    const booking = data.map((item) => item.booking);
    const post = data.map((item) => item.post);
    const labels = data.map((item) => item.label);

    setSeriesData({
      series: [
        { data: booking, label: "Đặt sân không tuyển người" },
        { data: post, label: "Đặt sân có tuyển người" },
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

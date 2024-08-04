import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết từ Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChartForBookingAndPostAdmin() {
  const [seriesData, setSeriesData] = useState({
    series: [
      { data: [100, 200, 300, 400, 500, 600, 700], label: "Đặt sân" },
      { data: [150, 250, 350, 450, 550, 650, 750], label: "Bài post" },
    ],
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
  });

  useEffect(() => {
    // Bạn có thể thay thế đoạn mã này bằng lời gọi API thực tế khi có
    // const getData = async () => {
    //   try {
    //     const result = await CallApi("/api/admin/booking/get-all-booking-and-post-12-month-latest", "get");
    //     const booking = result.data.map((item) => item.booking);
    //     const post = result.data.map((item) => item.post);
    //     const labels = result.data.map((item) => item.label);
    //     setSeriesData({
    //       series: [
    //         { data: booking, label: "Đặt sân" },
    //         { data: post, label: "Bài post" },
    //       ],
    //       labels: labels,
    //     });
    //   } catch (error) {
    //     console.log("🚀 ========= error:", error);
    //   }
    // };
    // getData();
  }, []);

  return (
    <Bar
      data={{
        labels: seriesData.labels,
        datasets: seriesData.series.map((serie) => ({
          label: serie.label,
          data: serie.data,
          backgroundColor: serie.label === "Đặt sân" ? 'rgba(75, 192, 192, 0.2)' : 'rgba(153, 102, 255, 0.2)',
          borderColor: serie.label === "Đặt sân" ? 'rgba(75, 192, 192, 1)' : 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        })),
      }}
      height={290}
      options={{
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
}

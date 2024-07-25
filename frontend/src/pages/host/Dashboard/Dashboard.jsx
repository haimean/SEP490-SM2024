import React from "react";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const DashboardHost = () => {
  const labels = [
    "Player 1",
    "Player 2",
    "Player 3",
    "Player 4",
    "Player 5",
    "Player 6",
    "Player 7",
    "Player 8",
    "Player 9",
    "Player 10",
    "Player 11",
    "Player 12",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Người chơi đặt sân nhiều nhất",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45, 50, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  const labels1 = [
    "Sân 1",
    "Sân 2",
    "Sân 3",
    "Sân 4",
    "Sân 5",
    "Sân 6",
    "Sân 7",
    "Sân 8",
    "Sân 9",
    "Sân 10",
    "Sân 11",
    "Sân 12",
  ];
  const data1 = {
    labels: labels1,
    datasets: [
      {
        label: "Cơ sở 1",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45, 50, 10, 5, 2, 20, 30, 45],
      },
      {
        label: "Cơ sở 2",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 20, 30, 40, 50, 45, 50, 10, 5, 20, 60],
      },
    ],
  };
  const labels2 = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const data2 = {
    labels: labels2,
    datasets: [
      {
        label: "Người chơi 1",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45, 50, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  const options = {
    animation: {
      duration: 2000, // Thời gian của hoạt ảnh (ms)
      easing: "easeInOutQuad", // Kiểu easing cho hoạt ảnh
    },
  };

  return (
    <div className="grid grid-cols-2">
      <div>
        <div className="flex gap-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="From" />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="To" />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <Typography variant="h6" component="h2">
          Người chơi đặt sân nhiều nhất
        </Typography>
        <Bar data={data} options={options} />
      </div>
      <div>
        <Typography variant="h6" component="h2">
          Biểu đồ tổng doanh thu
        </Typography>
        <Line data={data1} options={options} />
      </div>
      <div>
        <Typography variant="h6" component="h2">
          Số lần đặt sân của 1 người trong tháng
        </Typography>
        <Bar data={data2} options={options} />
      </div>
    </div>
  );
};

export default DashboardHost;

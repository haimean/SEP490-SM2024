import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardCp = () => {
  const visitorData = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    datasets: [
      {
        label: "Số lượng truy cập",
        data: [120, 190, 300, 500, 250, 400, 350],
        borderColor: "rgb(75, 192, 192)", // Màu của đường
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Màu nền dưới đường
        fill: true, // Cho phép tô màu dưới đường
        tension: 0.4, // Độ cong của đường (0 là thẳng, 1 là cong nhất)
        pointBackgroundColor: "rgb(75, 192, 192)", // Màu của điểm
        pointBorderColor: "#fff", // Màu viền của điểm
        pointHoverBackgroundColor: "#fff", // Màu của điểm khi hover
        pointHoverBorderColor: "rgb(75, 192, 192)", // Màu viền của điểm khi hover
        pointRadius: 5, // Kích thước của điểm
        pointHoverRadius: 7, // Kích thước của điểm khi hover
        borderWidth: 2, // Độ dày của đường
      },
    ],
  };

  const options = {
    responsive: true, // Cho phép biểu đồ responsive
    maintainAspectRatio: false, // Không giữ tỷ lệ khung hình
    plugins: {
      legend: {
        position: "top", // Vị trí của legend
        labels: {
          font: {
            size: 14, // Kích thước font của legend
          },
        },
      },
      title: {
        display: true,
        text: "Thống kê lượt truy cập website trong tuần",
        font: {
          size: 18, // Kích thước font của tiêu đề
        },
      },
      tooltip: {
        mode: "index", // Hiển thị tooltip cho tất cả datasets tại một index
        intersect: false, // Không cần hover chính xác vào điểm để hiển thị tooltip
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Ẩn lưới dọc
        },
        ticks: {
          font: {
            size: 12, // Kích thước font của nhãn trục x
          },
        },
      },
      y: {
        beginAtZero: true, // Bắt đầu từ 0
        ticks: {
          font: {
            size: 12, // Kích thước font của nhãn trục y
          },
        },
      },
    },
    interaction: {
      mode: "nearest", // Tương tác với điểm gần nhất
      axis: "x", // Chỉ tương tác theo trục x
      intersect: false, // Không cần hover chính xác vào điểm
    },
    animation: {
      duration: 1000, // Thời gian animation khi load chart
      easing: "easeOutQuart", // Kiểu animation
    },
  };

  return (
    <div style={{ width: "800px", height: "400px" }}>
      <Line data={visitorData} options={options} />
    </div>
  );
};

export default DashboardCp;

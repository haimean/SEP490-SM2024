import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết
Chart.register(ArcElement, Tooltip, Legend);

// Hàm để tạo màu ngẫu nhiên
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PieChartAdmin = ({ data }) => {
  const defaultColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8A2BE2",
    "#DC143C",
    "#00CED1",
    "#FFD700",
    "#ADFF2F",
    "#FF4500"
  ];

  // Tạo danh sách màu với số lượng màu bằng hoặc lớn hơn số lượng sân
  const backgroundColors = data.length > defaultColors.length
    ? [...defaultColors, ...Array(data.length - defaultColors.length).fill().map(getRandomColor)]
    : defaultColors;

  const totalRevenue = data.reduce((sum, item) => sum + item.totalRevenue, 0);

  const [hiddenIndices, setHiddenIndices] = useState([]);

  const toggleVisibility = (index) => {
    setHiddenIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const chartData = {
    labels: data?.map(item => item.courtName),
    datasets: [
      {
        label: "Doanh thu",
        data: data.map((item, index) => hiddenIndices.includes(index) ? 0 : item.totalRevenue),
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Tắt chú thích mặc định
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
            const percentage = ((value / totalRevenue) * 100).toFixed(2);
            return `${formattedValue} (${percentage}%)`;
          },
          title: (tooltipItem) => {
            return tooltipItem[0].label;
          }
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
        {chartData.labels.map((label, index) => (
          <div key={index} 
               style={{ display: "flex", alignItems: "center", margin: "5px 0", cursor: 'pointer' }}
               onClick={() => toggleVisibility(index)}>
            <div style={{ 
                width: 20, 
                height: 20, 
                backgroundColor: hiddenIndices.includes(index) ? '#ccc' : backgroundColors[index], 
                marginRight: 10 
            }} className="!w-5 !h-5"></div>
            <span style={{ textDecoration: hiddenIndices.includes(index) ? 'line-through' : 'none' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChartAdmin;

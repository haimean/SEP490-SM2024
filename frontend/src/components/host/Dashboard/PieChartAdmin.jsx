/* eslint-disable react/prop-types */
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { PieChart, useSvgRef } from "@mui/x-charts";
import { useEffect } from "react";
import { Typography } from "@mui/material";

//Register the required components
Chart.register(ArcElement, Tooltip, Legend);

//Function to generate random colors
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PieChartAdmin = ({ data }) => {
  console.log("pie admin cuc cut", data);

  const [dataChart, setDataChart] = useState([]);
  const [isNull, setIsNull] = useState(true);
  useEffect(() => {
    if (data.length === 0) {
      setIsNull(true);
    }
    const value = data.map((item, index) => {
      if (item.totalRevenue != 0) {
        setIsNull(false);
      }
      return { id: index, value: item.totalRevenue, label: item.courtName };
    });

    setDataChart(value);
  }, [data]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isNull ? (
        <Typography>Không có dữ liệu</Typography>
      ) : (
        dataChart.length > 0 && (
          <PieChart
            series={[
              {
                arcLabel: (item) =>
                  `${new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.value)}`,
                arcLabelMinAngle: 45,
                data: dataChart,
              },
            ]}
            width={400}
            height={200}
          />
        )
      )}
    </div>
  );
};

export default PieChartAdmin;

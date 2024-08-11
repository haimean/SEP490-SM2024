/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts";
import { Typography } from "@mui/material";

// Function to generate colors dynamically based on the number of items
const generateColors = (numItems) => {
  const colors = [];
  const step = 360 / numItems;
  for (let i = 0; i < numItems; i++) {
    colors.push(`hsl(${i * step}, 70%, 50%)`);
  }
  return colors;
};

const PieChartAdmin = ({ data }) => {
  const [dataChart, setDataChart] = useState([]);
  const [isNull, setIsNull] = useState(true);

  useEffect(() => {
    if (data.length === 0) {
      setIsNull(true);
    } else {
      setIsNull(false);
    }

    const totalRevenue = data.reduce((sum, item) => sum + item.totalRevenue, 0);
    const colors = generateColors(data.length); // Generate colors based on the number of items

    const value = data.map((item, index) => {
      return {
        id: index,
        value: item.totalRevenue,
        label: item.courtName,
        color: colors[index],
        percentage: ((item.totalRevenue / totalRevenue) * 100).toFixed(2), // Calculate percentage
      };
    });

    setDataChart(value);
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      {isNull ? (
        <Typography>Không có dữ liệu</Typography>
      ) : (
        dataChart.length > 0 && (
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Legend sẽ được hiển thị bên trái */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginRight: "1rem", maxHeight: "300px", overflowY: "auto" }}>
              {dataChart.map((item, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", fontSize: "12px" }}>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: item.color,
                      marginRight: "8px",
                    }}
                  />
                  <Typography>{item.label}</Typography>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PieChart
              series={[
                {
                  arcLabel: (item) =>
                    `${new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.value)} (${item.percentage}%)`, // Display value and percentage
                  arcLabelMinAngle: 45,
                  data: dataChart.map((item) => ({
                    id: item.id,
                    value: item.value,
                    label: item.label,
                    color: item.color,
                    percentage: item.percentage, // Pass percentage to PieChart
                  })),
                  color: ({ datum }) => datum.color, // Apply the color from the dataChart
                  valueFormatter: (item) =>
                    `${new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.value)} (${item.percentage}%)`, // Tooltip shows value and percentage
                },
              ]}
              width={500}
              height={300}
              slotProps={{ legend: { hidden: true } }}
            />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PieChartAdmin;

import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PropTypes from "prop-types";

const SectionDashboard = ({ title, currentValue, previousValue, isCurrency }) => {
  const isIncrease = currentValue >= previousValue;
  const percentageChange = previousValue
    ? ((currentValue - previousValue) / previousValue) * 100
    : 0;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const displayValue = isCurrency ? formatCurrency(currentValue) : currentValue;

  return (
    <Card
      sx={{
        background: "#87CEEB", // Màu xanh dương
        color: "white",
        borderRadius: 2,
      }}
    >
      <CardContent className="flex justify-center w-96">
        <Typography variant="h6" component="div">
          {title}: {displayValue}
        </Typography>
        {/* <Typography
          variant="body2"
          sx={{ display: "flex", alignItems: "center", mb: 1 }}
        >
          <span
            style={{
              color: isIncrease ? "green" : "red",
              marginRight: 4,
            }}
          >
            {isIncrease ? `Tăng` : `Giảm`}{` ${percentageChange.toFixed(2)}% (so với cùng kì tháng trước)`}
          </span>
          <span>
            {isIncrease ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </span>
        </Typography> */}
      </CardContent>
    </Card>
  );
};

SectionDashboard.propTypes = {
  title: PropTypes.string.isRequired,
  currentValue: PropTypes.number.isRequired,
  previousValue: PropTypes.number.isRequired,
  isCurrency: PropTypes.bool,
};

export default SectionDashboard;

import { memo, useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

const month = [
  { id: 1, label: "3 tháng", value: 3 },
  { id: 2, label: "6 tháng", value: 6 },
  { id: 3, label: "9 tháng", value: 9 },
  { id: 4, label: "12 tháng", value: 12 },
];

const OptionChartPlayerFilter = ({
  optionChartPlayer,
  handleChange,
  optionYear,
  handleChangeYear,
  optionMonth,
  handleChangeMonth,
  optionWeek,
  handleChangeWeek,
}) => {
  const [allSunday, setAllSunday] = useState([]);

  const getAllSundaysOfYear = (year) => {
    const sundays = [];
    const date = new Date(year, 0, 1); // Start from January 1st

    // Find the first Sunday of the year
    while (date.getDay() !== 0) {
      date.setDate(date.getDate() + 1);
    }

    // Add all Sundays to the array
    while (date.getFullYear() === year) {
      sundays.push(new Date(date));
      date.setDate(date.getDate() + 7); // Move to the next Sunday
    }
    setAllSunday(sundays);
  };

  useEffect(() => {
    getAllSundaysOfYear(optionYear);
  }, [optionYear]);

  const weekOptions = allSunday.map((date, index) => ({
    id: index,
    label: `${date.getDate()}-${date.getMonth() + 1}`,
    value: date.toISOString().split("T")[0], // ISO format for easy comparison
  }));

  return (
    <Box sx={{ minWidth: 400, display: "flex", gap: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={optionChartPlayer}
          label="chartPlayer"
          onChange={handleChange}
        >
          <MenuItem value={"week"}>Week</MenuItem>
          <MenuItem value={"month"}>Month</MenuItem>
        </Select>
      </FormControl>
      {optionChartPlayer === "week" && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={optionYear}
            label="year"
            onChange={handleChangeYear}
          >
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2025}>2025</MenuItem>
          </Select>
        </FormControl>
      )}
      {optionChartPlayer === "week" && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter week</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={optionWeek}
            label="week"
            onChange={handleChangeWeek}
          >
            {weekOptions.map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {optionChartPlayer === "month" && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={optionMonth}
            label="month"
            onChange={handleChangeMonth}
          >
            {month.map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

OptionChartPlayerFilter.propTypes = {
  optionChartPlayer: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  optionYear: PropTypes.number.isRequired,
  handleChangeYear: PropTypes.func.isRequired,
  optionMonth: PropTypes.number.isRequired,
  handleChangeMonth: PropTypes.func.isRequired,
  optionWeek: PropTypes.string.isRequired,
  handleChangeWeek: PropTypes.func.isRequired,
};

export default memo(OptionChartPlayerFilter);

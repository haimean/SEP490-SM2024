/* eslint-disable react/prop-types */
import { memo } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const month = [
  { id: 1, label: "3 tháng", value: 3 },
  { id: 2, label: "6 tháng", value: 6 },
  { id: 3, label: "9 tháng", value: 9 },
  { id: 4, label: "12 tháng", value: 12 },
];
const getRecentYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, index) => currentYear - index);
};
const OptionChartPlayerFilter = ({
  optionChartPlayer,
  handleChange,
  optionMonthChange,
  handleChangeMonthInYear,
  optionMonth,
  handleChangeMonth,
  optionYear,
  handleChangeYear,
}) => {
  const recentYears = getRecentYears();
  return (
    <Box sx={{ minWidth: 600, display: "flex", gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Lọc theo tháng</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={optionChartPlayer}
          label="chartPlayer"
          onChange={handleChange}
        >
          <MenuItem value={"week"}>Theo tháng cụ thể</MenuItem>
          <MenuItem value={"month"}>Theo tháng gộp</MenuItem>
        </Select>
      </FormControl>
      {optionChartPlayer === "week" && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Năm</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={optionYear}
            label="year"
            onChange={handleChangeYear}
          >
            {recentYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {optionChartPlayer === "week" && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={optionMonthChange}
            label="year"
            onChange={handleChangeMonthInYear}
          >
            <MenuItem value={1}>Tháng 1</MenuItem>
            <MenuItem value={2}>Tháng 2</MenuItem>
            <MenuItem value={3}>Tháng 3</MenuItem>
            <MenuItem value={4}>Tháng 4</MenuItem>
            <MenuItem value={5}>Tháng 5</MenuItem>
            <MenuItem value={6}>Tháng 6</MenuItem>
            <MenuItem value={7}>Tháng 7</MenuItem>
            <MenuItem value={8}>Tháng 8</MenuItem>
            <MenuItem value={9}>Tháng 9</MenuItem>
            <MenuItem value={10}>Tháng 10</MenuItem>
            <MenuItem value={11}>Tháng 11</MenuItem>
            <MenuItem value={12}>Tháng 12</MenuItem>
          </Select>
        </FormControl>
      )}
      {optionChartPlayer === "month" && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
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
export default memo(OptionChartPlayerFilter);

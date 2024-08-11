import React from "react";
import { Box, Select, MenuItem } from "@mui/material";

const FilterCp = ({ filters }) => {
  //filters có dạng
  /*
const filters = [
  {
    name: "distance",
    label: "Khoảng cách",
    options: [
      { value: "near", label: "Gần nhất" },
      { value: "far", label: "Xa nhất" },
    ],
  },
*/
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {filters.map((filter) => (
        <Select
          key={filter.name}
          defaultValue=""
          displayEmpty
          sx={{ minWidth: 120 }}
          onChange={(e) => filter.onChange(e.target.value)}
        >
          <MenuItem value="" disabled>
            {filter.label}
          </MenuItem>
          {filter.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ))}
    </Box>
  );
};

export default FilterCp;

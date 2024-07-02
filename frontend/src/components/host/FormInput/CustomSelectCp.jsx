import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
} from "@mui/material";

const CustomSelectCp = ({ field, control, errors }) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const handleSelectChange = (onChange) => (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "custom") {
      setIsCustom(true);
      onChange("");
    } else {
      setIsCustom(false);
      onChange(selectedValue);
    }
  };

  const handleCustomInputChange = (event) => {
    setCustomValue(event.target.value);
  };

  const handleAddCustomValue = (onChange) => async () => {
    if (customValue && field.onCustomInput) {
      await field.onCustomInput({ value: customValue, id: field.key });
      const newOption = {
        key: customValue,
        label: customValue,
      };
      field.options.push(newOption);
      onChange(newOption.key); // Cập nhật giá trị của Select
      setIsCustom(false);
      setCustomValue("");
    }
  };

  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue=""
      rules={{ required: field.required }}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth>
          <InputLabel>{field.label}</InputLabel>
          <Select
            value={isCustom ? "custom" : value}
            onChange={handleSelectChange(onChange)}
            label={field.label}
          >
            {field.options.map((option) => (
              <MenuItem key={option.key} value={option.key}>
                {option.label}
              </MenuItem>
            ))}
            <MenuItem value="custom">Khác</MenuItem>
          </Select>
          {isCustom && (
            <Box sx={{ mt: 1, display: "flex", alignItems: "flex-end" }}>
              <TextField
                fullWidth
                label="Nhập giá trị tùy chỉnh"
                value={customValue}
                onChange={handleCustomInputChange}
                variant="standard"
              />
              <Button
                onClick={handleAddCustomValue(onChange)}
                variant="contained"
                sx={{ ml: 1 }}
              >
                Thêm
              </Button>
            </Box>
          )}
        </FormControl>
      )}
    />
  );
};

export default CustomSelectCp;

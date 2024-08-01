import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const DistrictSelect = ({ field, control, errors, districts }) => {
  return (
    <FormControl
      fullWidth
      error={!!errors[field.name]}
      disabled={field.disabled}
    >
      <InputLabel>{field.label}</InputLabel>
      <Controller
        name={field.name}
        control={control}
        defaultValue=""
        rules={{ required: field.required }}
        render={({ field: { onChange, value } }) => (
          <Select
            value={value ? value.id : ""}
            onChange={(e) => {
              const selectedDistrict = districts.find(
                (d) => d.id === e.target.value
              );
              onChange({
                id: selectedDistrict.id,
                name: selectedDistrict.name,
              });
              field.onDistrictChange &&
                field.onDistrictChange(selectedDistrict.id);
            }}
            label={field.label}
            disabled={field.disabled}
          >
            {districts?.map((district) => (
              <MenuItem key={district.id} value={district.id}>
                {district.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default DistrictSelect;

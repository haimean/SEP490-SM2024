import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const ProvinceSelect = ({ field, control, errors, provinces }) => {
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
              const selectedProvince = provinces.find(
                (p) => p.id === e.target.value
              );
              onChange({
                id: selectedProvince.id,
                name: selectedProvince.name,
              });
              field.onProvinceChange &&
                field.onProvinceChange(selectedProvince.id);
            }}
            label={field.label}
            disabled={field.disabled}
          >
            {provinces?.map((province) => (
              <MenuItem key={province.id} value={province.id}>
                {province.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default ProvinceSelect;

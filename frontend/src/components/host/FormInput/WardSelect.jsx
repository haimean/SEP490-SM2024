import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const WardSelect = ({ field, control, errors, wards }) => {
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
              const selectedWard = wards.find((w) => w.id === e.target.value);
              onChange({
                id: selectedWard.id,
                name: selectedWard.name,
              });
            }}
            label={field.label}
            disabled={field.disabled}
          >
            {wards?.map((ward) => (
              <MenuItem key={ward.id} value={ward.id}>
                {ward.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default WardSelect;

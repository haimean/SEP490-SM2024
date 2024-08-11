/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectCp = ({ field, control, errors }) => (
  <FormControl fullWidth>
    <InputLabel>{field.label}</InputLabel>
    <Controller
      name={field.name}
      control={control}
      defaultValue=""
      errors={errors}
      rules={{ required: field.required }}
      render={({ field: { onChange, value } }) => (
        <Select value={value} onChange={onChange} label={field.label}>
          {field.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  </FormControl>
);

export default SelectCp;

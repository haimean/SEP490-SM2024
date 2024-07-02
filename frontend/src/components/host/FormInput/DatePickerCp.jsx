import { TextField } from "@mui/material";
import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

const DatePickerCp = ({ field, control, errors }) => (
  <Controller
    name={field.name}
    control={control}
    defaultValue={null}
    errors={errors}
    rules={{ required: field.required }}
    render={({ field: { onChange, value } }) => (
      <DatePicker
        selected={value}
        onChange={onChange}
        showDateSelect
        dateFormat="dd/MM/yyyy"
        customInput={<TextField fullWidth label={field.label} />}
      />
    )}
  />
);

export default DatePickerCp;

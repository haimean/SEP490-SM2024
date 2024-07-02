import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const TextFieldCp = ({ field, control, errors }) => (
  <Controller
    name={field.name}
    control={control}
    defaultValue=""
    errors={errors}
    rules={{ required: field.required }}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        fullWidth
        label={field.label}
        type={field.type}
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error ? error.message : null}
      />
    )}
  />
);

export default TextFieldCp;

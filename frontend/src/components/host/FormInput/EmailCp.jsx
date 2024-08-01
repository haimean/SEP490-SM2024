import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { EMAIL_REGEX } from "../../../utils/regex";

const EmailCp = ({ field, control, errors, readOnly }) => (
  <Controller
    name={field.name}
    control={control}
    defaultValue={field.defaultValue || ""}
    rules={{
      required: field.required ? `${field.label} là bắt buộc` : false,
      validate: {
        validEmail: (value) =>
          EMAIL_REGEX.test(value) || `${field.label} không hợp lệ`,
      },
    }}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        fullWidth
        label={field.label}
        type="email"
        value={value}
        required={field.required}
        onChange={(e) => {
          onChange(e.target.value.trim());
        }}
        error={!!error}
        InputProps={{
          readOnly: field.readOnly || readOnly,
        }}
        helperText={error ? error.message : null}
      />
    )}
  />
);

export default EmailCp;

import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { PHONE_REGEX } from "../../../utils/regex/index";

const TelCp = ({ field, control, errors, readOnly }) => (
  <Controller
    name={field.name}
    control={control}
    defaultValue={field.defaultValue || ""}
    rules={{
      required: field.required ? `${field.label} là bắt buộc` : false,
      validate: {
        validPhoneNumber: (value) =>
          PHONE_REGEX.test(value) || `${field.label} không hợp lệ`,
      },
    }}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        fullWidth
        label={field.label}
        type="tel"
        value={value}
        required={field.required}
        onChange={(e) => {
          const input = e.target.value;
          const sanitizedInput = input.replace(/[^\d+]/g, "");
          onChange(sanitizedInput);
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

export default TelCp;

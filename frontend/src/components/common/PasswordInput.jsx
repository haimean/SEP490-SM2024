import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordInput = ({
  label,
  id,
  defaultValue,
  disabled,
  readOnly,
  placeholder,
  register,
  errors,
  required,
  pattern,
  type = "text",
  minLength,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <TextField
      label={label}
      id={id}
      fullWidth
      margin="normal"
      type={inputType}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      InputProps={{
        readOnly: readOnly,
        endAdornment: type === "password" && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePasswordVisibility}
              edge="end"
            >
              {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...register(id, { required, pattern, minLength })}
      error={!!errors[id]}
      helperText={
        errors[id]
          ? errors[id].type === "pattern"
            ? pattern.message
            : errors[id].type === "minLength"
            ? `${label} phải có nhiều hơn ${minLength} kí tự.`
            : `${label} không được để trống`
          : ""
      }
    />
  );
};

export default PasswordInput;

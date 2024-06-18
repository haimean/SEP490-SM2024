import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const InputLabel = ({
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
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...register(id, { required, pattern, minLength })}
          id={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={inputType}
          disabled={disabled}
          readOnly={readOnly}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none focus:shadow-outline"
        />
        {type === "password" && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
          >
            {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          </span>
        )}
      </div>
      {errors[id] && (
        <p className="text-red-500 text-xs italic mt-1">
          {errors[id].type === "pattern"
            ? pattern.message
            : errors[id].type === "minLength"
            ? `${label} phải có nhiều hơn ${minLength} kí tự.`
            : `${label} không được để trống`}
        </p>
      )}
    </div>
  );
};

export default InputLabel;

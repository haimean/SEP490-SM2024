import React, { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const InputLabel = ({ label, id, defaultValue, placeholder, register, errors, required, pattern, type = "text", minLength }) => {
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {type === "password" && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
          >
            {showPassword ? <RemoveRedEyeIcon/> : <VisibilityOffIcon/>}
          </span>
        )}
      </div>
      {errors[id] && (
        <p className="text-red-500 text-xs italic">
          {errors[id].type === "pattern"
            ? pattern.message
            : errors[id].type === "minLength"
            ? `${label} must be at least ${minLength} characters.`
            : `${label} is required.`}
        </p>
      )}
    </div>
  );
};

export default InputLabel;

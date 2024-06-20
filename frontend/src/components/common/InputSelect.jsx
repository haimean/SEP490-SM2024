import React from "react";
import ic_dropdown from "../../assets/svg/ic_dropdown.svg";

const InputSelect = ({
  label,
  id,
  defaultValue,
  placeholder,
  register,
  errors,
  required,
  options,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <select
          {...register(id, { required })}
          id={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <img src={ic_dropdown} alt="Dropdown Icon" className="h-4 w-4" />
        </div>
      </div>
      {errors[id] && (
        <p className="text-red-500 text-xs italic">{`${label} is required.`}</p>
      )}
    </div>
  );
};

export default InputSelect;

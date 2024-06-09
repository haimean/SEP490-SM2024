import React from 'react';

const InputLabel = ({ label, id, register, errors, required }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        {...register(id, { required })}
        id={id}
        defaultValue=""
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {errors[id] && (
        <p className="text-red-500 text-xs italic">{`${label} is required.`}</p>
      )}
    </div>
  );
};

export default InputLabel;
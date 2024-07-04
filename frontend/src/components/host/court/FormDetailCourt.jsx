/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FormDetailCourt({
  onSubmit,
  branchList,
  typeCourtList,
  court,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  useEffect(() => {
    // Reset form values when `court` changes
    if (court) {
      reset({
        name: court.name || "",
        branchesId: court.branchesId || "",
        typeCourtId: court.typeCourtId || "",
      });
    }
  }, [court, reset]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            {...register("name", {
              required: "Name is required",
              onBlur: () => trigger("name"),
            })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* BranchId Select Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="branchesId"
          >
            Branch
          </label>
          <select
            id="branchesId"
            {...register("branchesId", {
              required: "Branch is required",
              onBlur: () => trigger("branchesId"),
            })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Branch</option>
            {branchList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.branchesId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.branchesId.message}
            </p>
          )}
        </div>

        {/* TypeCourtId Select Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="typeCourtId"
          >
            Type Court
          </label>
          <select
            id="typeCourtId"
            {...register("typeCourtId", {
              required: "Type Court is required",
              onBlur: () => trigger("typeCourtId"),
            })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Type Court</option>
            {typeCourtList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.typeCourtId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.typeCourtId.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

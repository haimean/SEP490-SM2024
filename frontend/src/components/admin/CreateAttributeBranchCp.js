import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from "axios";

const CreateAttributeBranchCp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4200/api/admin/attribute-branches/key",
        {
          name: data.name,
          description: data.description,
        }
      );
      if (response) {
        toast.success(`Create ${response?.data?.error} successful!`);
        navigate("/branch-attribute");
      }
      console.log(response?.status);
    } catch (error) {
      console.error("Error creating attribute:", error);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="mb-4 w-2/3">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            {...register("name", { required: true })}
            id="name"
            defaultValue=""
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && <p className="text-red-500 text-xs italic">Name is required.</p>}

          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2 mt-4"
          >
            Description
          </label>
          <input
            {...register("description", { required: true })}
            id="description"
            defaultValue=""
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.description && <p className="text-red-500 text-xs italic">Description is required.</p>}

          <div className="flex justify-end my-4">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Create Attribute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAttributeBranchCp;

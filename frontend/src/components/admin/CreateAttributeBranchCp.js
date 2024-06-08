import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from "axios";
import InputLabel from "../common/InputLabel";

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
        toast.success(`Create ${response?.data?.name} successful!`);
        navigate("/branch-attribute");
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error creating attribute:", error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="mb-4 w-2/3">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <InputLabel
            label="Name"
            id="name"
            register={register}
            errors={errors}
            required={true}
          />

          <InputLabel
            label="Description"
            id="description"
            register={register}
            errors={errors}
            required={true}
          />

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

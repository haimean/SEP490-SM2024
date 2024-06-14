import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CallApi from "../../../services/CallApi.js";
import ModalCreate from "../ModalCreate.js";

const CreateAttributeBranchCp = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await CallApi(
        "/api/admin/attribute-branches/key",
        "post",
        {
          name: data.name,
          description: data.description,
        },
        {}
      );
      toast.success(`Create ${response?.data?.name} successful!`);
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleClear = () => {
    reset();
  };

  return (
    <ModalCreate
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      handleClear={handleClear}
      register={register}
      errors={errors}
      fields={{
        title: "Create Branch Attribute",
        inputs: [
          {
            id: "name",
            label: "Name",
            placeholder: "Name",
            register: { register },
            pattern: {
              value: /^\s*\S.*$/,
              message: "Please enter valid character"
            },
            errors: { errors },
            required: true
          },
          {
            id: "description",
            label: "Description",
            placeholder: "Description",
            register: { register },
            pattern: {
              value: /^\s*\S.*$/,
              message: "Please enter valid character"
            },
            errors: { errors },
            required: true,
          },
        ],
        submitText: "Create Attribute",
      }}
    />
  );
};

export default CreateAttributeBranchCp;

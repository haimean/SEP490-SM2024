import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ModalCreate from "../ModalCreate.jsx";
import CallApi from "../../../service/CallAPI.jsx";

const CreateAtbCourtValueCp = ({ attributeKeyCourtId, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const requestData = {
      ...data,
      attributeKeyCourtId: attributeKeyCourtId,
    };
    try {
      const response = await CallApi(
        "/api/admin/attribute-court",
        "post",
        requestData,
        {}
      );
      toast.success(`Create ${response?.data?.value} successful!`);
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
        title: "Create Court Value",
        inputs: [
          {
            id: "value",
            label: "Value",
            placeholder: "Value",
            register: { register },
            pattern: {
              value: /^\s*\S.*$/,
              message: "Please enter valid character",
            },
            errors: { errors },
            required: true,
          },
        ],
        submitText: "Create Value",
      }}
    />
  );
};

export default CreateAtbCourtValueCp;

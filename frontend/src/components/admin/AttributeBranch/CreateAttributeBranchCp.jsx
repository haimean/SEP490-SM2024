import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CallApi from "../../../service/CallAPI.jsx";
import ModalCreate from "../ModalCreate.jsx";
import { WHITE_SPACE_REGEX } from "../../../utils/regex/index.js";

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
      toast.success(`Tạo ${response?.data?.name} thành công!`);
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
        title: "Thêm thuộc tính cơ sở",
        inputs: [
          {
            id: "name",
            label: "Tên",
            placeholder: "Tên thuộc tính",
            register: { register },
            pattern: {
              value: WHITE_SPACE_REGEX,
              message: "Vui lòng điền ký tự hợp lệ",
            },
            errors: { errors },
            required: true,
          },
          {
            id: "description",
            label: "Mô tả",
            placeholder: "Mô tả chi tiết",
            register: { register },
            pattern: {
              value: WHITE_SPACE_REGEX,
              message: "Vui lòng điền ký tự hợp lệ",
            },
            errors: { errors },
            required: true,
          },
        ],
        submitText: "Thêm",
      }}
    />
  );
};

export default CreateAttributeBranchCp;

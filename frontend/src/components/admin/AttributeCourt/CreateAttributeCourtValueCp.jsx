import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ModalCreate from "../ModalCreate.jsx";
import CallApi from "../../../service/CallAPI.jsx";
import { WHITE_SPACE_REGEX } from "../../../utils/regex/index.js";

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
      toast.success(`Tạo ${response?.data?.value} thành công!`);
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
        title: "Thêm đặc điểm sân đấu",
        inputs: [
          {
            id: "value",
            label: "Đặc điểm",
            placeholder: "Đặc điểm",
            register: { register },
            pattern: {
              value: WHITE_SPACE_REGEX,
              message: "Vui lòng nhập ký tự hợp lệ",
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

export default CreateAtbCourtValueCp;

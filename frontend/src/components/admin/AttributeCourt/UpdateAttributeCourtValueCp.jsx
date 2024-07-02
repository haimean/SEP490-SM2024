import React, { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ModalUpdate from "../ModalUpdate.jsx";
import { WHITE_SPACE_REGEX } from "../../../utils/regex/index.js";

const UpdateAtbCourtValueCp = ({ id, closeModal, attributeKeyCourtId }) => {
  const [courtAtb, setCourtAtb] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchCourtAtb();
  }, [id]);

  const fetchCourtAtb = async () => {
    try {
      const response = await CallApi(`/api/admin/attribute-court/${id}`, "get");
      setCourtAtb(response?.data);
      reset(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch court attribute ERROR: " +
          error.response?.data?.error
      );
    }
  };

  const onSubmit = async (data) => {
    try {
      //destructuring data
      const dataValue = {
        ...data,
      };
      //lấy data cần thiết vào body
      const requestData = {
        attributeKeyCourtId: attributeKeyCourtId,
        value: dataValue.value,
        isActive: dataValue.isActive,
      };

      await CallApi(`/api/admin/attribute-court/${id}`, "put", requestData, {});
      toast.success(`Cập nhật đặc điểm sân đấu thành công`);
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleClear = () => {
    reset();
  };

  return (
    <ModalUpdate
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      handleClear={handleClear}
      register={register}
      errors={errors}
      fields={{
        title: "Sửa đặc điểm sân đấu",
        inputs: [
          {
            id: "value",
            label: "Đặc điểm",
            placeholder: "Value",
            defaultValue: courtAtb.value,
            register: { register },
            pattern: {
              value: WHITE_SPACE_REGEX,
              message: "Vui lòng nhập ký tự hợp lệ",
            },
            errors: { errors },
            required: true,
          },
          {
            id: "isActive",
            label: "Kích hoạt",
            defaultValue: courtAtb.isActive ? "true" : "false",
            type: "select",
            options: [
              { value: "true", label: "Kích hoạt" },
              { value: "false", label: "Bỏ kích hoạt" },
            ],
          },
        ],
        submitText: "Sửa",
      }}
    />
  );
};

export default UpdateAtbCourtValueCp;

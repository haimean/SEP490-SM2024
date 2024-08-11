import React, { useEffect, useState } from "react";
import ModalUpdate from "../ModalUpdate.jsx";
import CallApi from "../../../service/CallAPI.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { WHITE_SPACE_REGEX } from "../../../utils/regex/index.js";

const UpdateAtbBranchValueCp = ({ id, closeModal, attributeKeyBranchesId }) => {
  const [branchAtb, setBranchAtb] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchBranchAtb();
  }, [id]);

  const fetchBranchAtb = async () => {
    try {
      const response = await CallApi(
        `/api/admin/attribute-branches/${id}`,
        "get"
      );
      setBranchAtb(response?.data);
      reset(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch branch attribute ERROR: " +
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
        attributeKeyBranchesId: attributeKeyBranchesId,
        value: dataValue.value,
        isActive: dataValue.isActive,
      };
      await CallApi(
        `/api/admin/attribute-branches/${id}`,
        "put",
        requestData,
        {}
      );
      toast.success(`Sửa đặc điểm cơ sở thành công`);
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
        title: "Sửa đặc điểm",
        inputs: [
          {
            id: "value",
            label: "Đặc điểm",
            placeholder: "Đặc điểm",
            defaultValue: branchAtb.value,
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
            defaultValue: branchAtb.isActive ? "true" : "false",
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

export default UpdateAtbBranchValueCp;

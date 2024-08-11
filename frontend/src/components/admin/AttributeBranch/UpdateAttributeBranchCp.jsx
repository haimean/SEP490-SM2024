import React, { useEffect, useState } from "react";
import ModalUpdate from "../ModalUpdate";
import CallAPI from "../../../service/CallAPI";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { WHITE_SPACE_REGEX } from "../../../utils/regex/index.js";

const UpdateAttributeBranchCp = ({ id, closeModal }) => {
  const [branchAtbKey, setBranchAtbKey] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchBranchAtbKey();
  }, [id]);

  const fetchBranchAtbKey = async () => {
    try {
      const response = await CallAPI(
        `/api/admin/attribute-branches/key/${id}`,
        "get"
      );
      setBranchAtbKey(response?.data);
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
      await CallAPI(
        `/api/admin/attribute-branches/key/${id}`,
        "put",
        {
          name: data.name,
          description: data.description,
          isActive: data.isActive,
        },
        {}
      );
      toast.success(`Sửa thuộc tính cơ sở thành công`);
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
        title: "Sửa thuộc tính cơ sở",
        inputs: [
          {
            id: "name",
            label: "Tên",
            defaultValue: branchAtbKey.name,
            placeholder: "Tên thuộc tính",
            type: "text",
            pattern: {
              value: WHITE_SPACE_REGEX,
              message: "Vui lòng nhập ký tự hợp lệ",
            },
            required: true,
          },
          {
            id: "description",
            label: "Mô tả",
            defaultValue: branchAtbKey.description,
            placeholder: "Mô tả chi tiết",
            type: "text",
            pattern: {
              value: WHITE_SPACE_REGEX,
              message: "Vui lòng nhập ký tự hợp lệ",
            },
            required: true,
          },
          {
            id: "isActive",
            label: "Kích hoạt",
            defaultValue: branchAtbKey.isActive ? "true" : "false",
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

export default UpdateAttributeBranchCp;

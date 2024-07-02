import React, { useEffect, useState } from "react";
import ModalUpdate from "../ModalUpdate.jsx";
import CallApi from "../../../service/CallAPI.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { WHITE_SPACE_REGEX } from "../../../utils/regex/index.js";

const UpdateAttributeCourtCp = ({ id, closeModal }) => {
  const [courtAtbKey, setCourtAtbKey] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchCourtAtbKey();
  }, [id]);

  const fetchCourtAtbKey = async () => {
    try {
      const response = await CallApi(
        `/api/admin/attribute-court/key/${id}`,
        "get"
      );
      setCourtAtbKey(response?.data);
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
      await CallApi(
        `/api/admin/attribute-court/key/${id}`,
        "put",
        {
          name: data.name,
          description: data.description,
          isActive: data.isActive,
        },
        {}
      );
      toast.success(`Cập nhật thuộc tính sân đấu thành công`);
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
        title: "Sửa thuộc tính sân đấu",
        inputs: [
          {
            id: "name",
            label: "Tên",
            defaultValue: courtAtbKey.name,
            register: { register },
            pattern: {
              value: WHITE_SPACE_REGEX,
              message: "Vui lòng nhập ký tự hợp lệ",
            },
            errors: { errors },
            required: true,
          },
          {
            id: "description",
            label: "Mô tả",
            defaultValue: courtAtbKey.description,
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
            defaultValue: courtAtbKey.isActive ? "true" : "false",
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

export default UpdateAttributeCourtCp;

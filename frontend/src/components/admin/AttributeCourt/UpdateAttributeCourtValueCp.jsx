import React, { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ModalUpdate from "../ModalUpdate.jsx";

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
      toast.success(`Update court value successful!`);
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
        title: "Update Court Value",
        inputs: [
          {
            id: "value",
            label: "Value",
            placeholder: "Value",
            defaultValue: courtAtb.value,
            register: { register },
            pattern: {
              value: /^\s*\S.*$/,
              message: "Please enter valid character",
            },
            errors: { errors },
            required: true,
          },
          {
            id: "isActive",
            label: "Active",
            defaultValue: courtAtb.isActive ? "true" : "false",
            type: "select",
            options: [
              { value: "true", label: "Active" },
              { value: "false", label: "Unactive" },
            ],
          },
        ],
        submitText: "Update Value",
      }}
    />
  );
};

export default UpdateAtbCourtValueCp;

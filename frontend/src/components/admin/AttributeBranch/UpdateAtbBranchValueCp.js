import React, { useEffect, useState } from 'react';
import ModalUpdate from '../ModalUpdate.js';
import CallApi from '../../../services/CallApi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
  }, [id])

  const fetchBranchAtb = async () => {
    try {
      const response = await CallApi(
        `/api/admin/attribute-branches/${id}`,
        'get',
      )
      setBranchAtb(response?.data);
      reset(response?.data);
    } catch (error) {
      console.log("=============== fetch branch attribute ERROR: " + error.response?.data?.error);
    }
  };

  const onSubmit = async (data) => {
    try {
      //destructuring data
      const dataValue = {
        ...data
      }
      //lấy data cần thiết vào body
      const requestData = {
        attributeKeyBranchesId: attributeKeyBranchesId,
        value: dataValue.value,
        isActive: dataValue.isActive
      };
      await CallApi(
        `/api/admin/attribute-branches/${id}`,
        "put",
        requestData,
        {}
      );
      toast.success(`Update branch value successful!`);
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
        title: "Update Branch Value",
        inputs: [
          {
            id: "value",
            label: "Value",
            placeholder: "Value",
            defaultValue: branchAtb.value,
            register: { register },
            pattern: {
              value: /^\s*\S.*$/,
              message: "Please enter valid character"
            },
            errors: { errors },
            required: true,
          },
          {
            id: "isActive",
            label: "Active",
            defaultValue: branchAtb.isActive ? 'true' : 'false',
            type: "select",
            required: true,
            options: [
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Unactive' },
            ],
          },
        ],
        submitText: "Update Value",
      }}
    />
  );
};

export default UpdateAtbBranchValueCp;
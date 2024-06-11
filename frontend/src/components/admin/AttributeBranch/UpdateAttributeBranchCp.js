import React, { useEffect, useState } from 'react';
import ModalCreate from '../../common/ModalCreate';
import CallApi from '../../../services/CallApi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
  },[id])

  const fetchBranchAtbKey = async () => {
    try {
      const response = await CallApi(
        `/api/admin/attribute-branches/key/${id}`,
        'get',
      )
      setBranchAtbKey(response?.data);
      reset(response?.data);
    } catch (error) {
      console.log("=============== fetch branch attribute ERROR: " + error.response?.data?.error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await CallApi(
        `/api/admin/attribute-branches/key/${id}`,
        "put",
        {
          name: data.name,
          description: data.description,
        },
        {}
      );
      toast.success(`Update branch attribute successful!`);
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
        title: "Update Branch Attribute",
        inputs: [
          {
            id: "name",
            label: "Name",
            defaultValue: branchAtbKey.name,
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
            defaultValue: branchAtbKey.description,
            register: { register },
            pattern: {
              value: /^\s*\S.*$/,
              message: "Please enter valid character"
            },
            errors: { errors },
            required: true,
          },
        ],
        submitText: "Update",
      }}
    />
  );
};

export default UpdateAttributeBranchCp;
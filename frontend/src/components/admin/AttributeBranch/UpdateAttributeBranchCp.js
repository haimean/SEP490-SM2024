import React, { useEffect, useState } from 'react';
import ModalUpdate from '../ModalUpdate'; // Updated import
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
  }, [id]);

  const fetchBranchAtbKey = async () => {
    try {
      const response = await CallApi(
        `/api/admin/attribute-branches/key/${id}`,
        'get'
      );
      setBranchAtbKey(response?.data);
      reset(response?.data);
    } catch (error) {
      console.log("=============== fetch branch attribute ERROR: " + error.response?.data?.error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await CallApi(
        `/api/admin/attribute-branches/key/${id}`,
        "put",
        {
          name: data.name,
          description: data.description,
          isActive: data.isActive
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
    <ModalUpdate
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
            placeholder: "Enter name",
            type: "text",
            pattern: {
              value: /^\s*\S.*$/,
              message: "Please enter valid character"
            },
            required: true
          },
          {
            id: "description",
            label: "Description",
            defaultValue: branchAtbKey.description,
            placeholder: "Enter description",
            type: "text",
            pattern: {
              value: /^\s*\S.*$/,
              message: "Please enter valid character"
            },
            required: true,
          },
          {
            id: "isActive",
            label: "Active",
            defaultValue: branchAtbKey.isActive ? 'true' : 'false',
            type: "select",
            options: [
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Unactive' },
            ],
          },
        ],
        submitText: "Update",
      }}
    />
  );
};

export default UpdateAttributeBranchCp;

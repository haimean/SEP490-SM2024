import React, { useEffect, useState } from 'react';
import ModalUpdate from '../ModalUpdate.js';
import CallApi from '../../../services/CallApi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
  },[id])

  const fetchCourtAtbKey = async () => {
    try {
      const response = await CallApi(
        `/api/admin/attribute-court/key/${id}`,
        'get',
      )
      setCourtAtbKey(response?.data);
      reset(response?.data);
    } catch (error) {
      console.log("=============== fetch court attribute ERROR: " + error.response?.data?.error);
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
          isActive: data.isActive
        },
        {}
      );
      toast.success(`Update court attribute successful!`);
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
        title: "Update Court Attribute",
        inputs: [
          {
            id: "name",
            label: "Name",
            defaultValue: courtAtbKey.name,
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
            defaultValue: courtAtbKey.description,
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
            defaultValue: courtAtbKey.isActive ? 'true' : 'false',
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

export default UpdateAttributeCourtCp;
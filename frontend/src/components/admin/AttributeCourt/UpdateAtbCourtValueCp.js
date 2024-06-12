import React, { useEffect, useState } from 'react';
import ModalCreate from '../../common/ModalCreate';
import CallApi from '../../../services/CallApi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
  }, [id])

  const fetchCourtAtb = async () => {
    try {
      const response = await CallApi(
        `/api/admin/attribute-court/${id}`,
        'get',
      )
      setCourtAtb(response?.data);
      reset(response?.data);
    } catch (error) {
      console.log("=============== fetch court attribute ERROR: " + error.response?.data?.error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const requestData = {
        attributeKeyCourtId: attributeKeyCourtId,
        value: data.value,
      };
      await CallApi(
        `/api/admin/attribute-court/${id}`,
        "put",
        requestData,
        {}
      );
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
    <ModalCreate
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
              message: "Please enter valid character"
            },
            errors: { errors },
            required: true,
          },
        ],
        submitText: "Update Value",
      }}
    />
  );
};

export default UpdateAtbCourtValueCp;
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputLabel from '../../common/InputLabel';
import CallApi from '../../../services/CallApi';

const CreateAttributeCourtCp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await CallApi(
        '/api/admin/attribute-court/key',
        'post',
        {
          name: data.name,
          description: data.description
        },
        {}
      )
      toast.success(`Create ${response?.data?.name} successful!`);
      navigate('/court-attribute');
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="mb-4 w-2/3">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <InputLabel
            label="Name"
            id="name"
            register={register}
            errors={errors}
            required={true}
          />

          <InputLabel
            label="Description"
            id="description"
            register={register}
            errors={errors}
            required={true}
          />

          <div className="flex justify-end my-4">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Create Attribute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAttributeCourtCp;
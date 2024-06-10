import React from 'react';
import InputLabel from '../../components/common/InputLabel.js'

const ModalCreate = ({ closeModal, handleSubmit, onSubmit, handleClear, register, errors, fields }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg overflow-hidden">
        <div className="flex justify-between px-4 py-4">
          <div className="flex items-center">
            <h1 className="text-center">{fields.title}</h1>
          </div>
          <button
            onClick={closeModal}
            className="self-end text-gray-500 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.inputs.map(input => (
              <InputLabel
                key={input.id}
                label={input.label}
                id={input.id}
                placeholder={input.placeholder}
                register={register}
                pattern={input.pattern}
                errors={errors}
                required={input.required}
              />
            ))}
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="p-2 border hover:bg-red-600 hover:text-white rounded-md"
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-md ml-2"
              >
                {fields.submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
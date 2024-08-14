/* eslint-disable react/prop-types */
import InputLabel from "../common/InputLabel";
import InputSelect from "../common/InputSelect";
import { Button } from "@mui/material";

const ModalUpdate = ({
  closeModal,
  handleSubmit,
  onSubmit,
  handleClear,
  register,
  errors,
  fields,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-[9999]">
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
            {fields.inputs.map((input) =>
              input.type === "select" ? (
                <InputSelect
                  key={input.id}
                  label={input.label}
                  id={input.id}
                  defaultValue={input.defaultValue}
                  register={register}
                  errors={errors}
                  required={input.required}
                  options={input.options}
                />
              ) : (
                <InputLabel
                  key={input.id}
                  label={input.label}
                  id={input.id}
                  defaultValue={input.defaultValue}
                  placeholder={input.placeholder}
                  register={register}
                  pattern={input.pattern}
                  errors={errors}
                  required={input.required}
                  type={input.type}
                  minLength={input.minLength}
                />
              )
            )}
            <div className="flex justify-end p-2">
              <Button
                variant="contained"
                color="error"
                className="p-2"
                onClick={handleClear}
              >
                Xóa
              </Button>
              <Button variant="contained" type="submit" className="p-2 ml-2">
                {fields.submitText}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;

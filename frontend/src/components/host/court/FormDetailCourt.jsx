/* eslint-disable react/prop-types */

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { useEffect } from "react";

export default function FormDetailCourt({
  onSubmit,
  typeCourtList,
  court,
  branchesId,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    // Reset form values when `court` changes
    console.log("typeCourtId", court?.typeCourtId);
    if (court) {
      reset({
        id: court?.id,
        branchesId: court?.branchesId,
        name: court?.name,
        typeCourtId: court?.typeCourtId,
      });
    } else {
      reset();
    }
  }, [court, reset]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <Typography variant="h6" component="h6">
        {!court ? "Tạo sân mới" : "Cập nhật sân"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {/* Name Field */}
        <input
          id="branchesId"
          {...register("branchesId")}
          value={branchesId}
          className="hidden"
        />
        {court && (
          <input
            id="id"
            {...register("id")}
            value={branchesId}
            className="hidden"
          />
        )}
        <div className="mb-4">
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Tên là bắt buộc",
              validate: (value) =>
                value.trim() !== "" || `Tên không thể chỉ chứa khoảng trắng`,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Tên sân"
                type="text"
                value={value}
                required={true}
                onChange={(e) => {
                  onChange(e);
                }}
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{
                  shrink: true, // Đảm bảo label luôn di chuyển lên trên
                }}
              />
            )}
          />
        </div>
        {/* TypeCourtId Select Field */}
        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel>Chọn kiểu sân</InputLabel>
            <Controller
              name="typeCourtId"
              control={control}
              rules={{ required: "Kiểu sân là bắt buộc" }}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value || ""} // Use a fallback value if `value` is undefined
                  onChange={onChange}
                  label="Chọn kiểu sân"
                >
                  {typeCourtList?.map((option) => (
                    <MenuItem key={option?.id} value={option?.id}>
                      {option?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.typeCourtId && (
              <Typography color="error">
                {errors.typeCourtId.message}
              </Typography>
            )}
          </FormControl>
        </div>
        <Button
          type="submit"
          variant="contained"
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
        >
          {!court ? "Tạo mới" : "Cập nhật"}
        </Button>
      </form>
    </div>
  );
}

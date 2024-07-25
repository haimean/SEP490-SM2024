import {
  Button,
  CardContent,
  TextareaAutosize,
  Typography,
} from "@mui/material";

export default function FormRequest({
  handleSubmit,
  onSubmit,
  register,
  errors,
  handleCloseModal,
}) {
  return (
    <CardContent>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Lý do từ chối
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextareaAutosize minRows={12} {...register("id")} hidden />
        <TextareaAutosize
          minRows={12}
          placeholder="Vui lòng nhập lý do từ chối tại đây..."
          {...register("reason", { required: "Trường này là bắt buộc" })}
          className={`w-full p-4 border-2 ${
            errors.reason ? "border-red-500" : "border-blue-500"
          } rounded-lg focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out`}
        />
        {errors.reason && (
          <Typography variant="body2" color="red-500" className="mt-2">
            {errors.reason.message}
          </Typography>
        )}
        <div className="mt-4 flex justify-end space-x-4">
          <Button
            type="button"
            variant="outlined"
            onClick={handleCloseModal}
            className="bg-gray-200 hover:bg-gray-300"
          >
            Hủy
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Gửi
          </Button>
        </div>
      </form>
    </CardContent>
  );
}

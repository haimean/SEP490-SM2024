import { Button, Dialog, Rating, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export default function ModalVote({ idSend, idReceive, open, handleClose }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Feedback Data:", data); // Xử lý dữ liệu ở đây
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        {/* Đánh giá sao */}
        <div style={{ marginBottom: "16px" }}>
          <Typography variant="h6" component="label">
            Đánh giá (1-5 sao)
          </Typography>
          <br />
          <Controller
            name="rating"
            control={control}
            rules={{ required: "Vui lòng chọn số sao" }}
            render={({ field }) => (
              <Rating
                {...field}
                precision={0.5}
                size="large"
                onChange={(_, value) => field.onChange(value)}
              />
            )}
          />
          {errors.rating && (
            <Typography color="error" variant="body2">
              {errors.rating.message}
            </Typography>
          )}
        </div>

        {/* Lý do đánh giá */}
        <TextField
          label="Lý do đánh giá"
          name="reason"
          {...register("reason", { required: "Vui lòng nhập lý do đánh giá" })}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.reason}
          helperText={errors.reason?.message}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Gửi đánh giá
        </Button>
      </form>
    </Dialog>
  );
}

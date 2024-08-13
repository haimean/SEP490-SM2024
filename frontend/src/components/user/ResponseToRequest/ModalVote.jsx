import { Button, Dialog, Rating, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";

export default function ModalVote({ idReceive, open, handleClose }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const Vote = async (rating, comment) => {
    try {
      const result = await CallApi("/api/user/review/", "post", {
        accountRecipientId: idReceive,
        rating,
        comment,
      });
      console.log("🚀 ========= result:", result);
      toast.success("Đánh giá thành công");
      handleClose();
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  const onSubmit = (data) => {
    console.log("Feedback Data:", data); // Xử lý dữ liệu ở đây
    Vote(data.rating, data.comment);
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
          name="comment"
          {...register("comment", { required: "Vui lòng nhập lý do đánh giá" })}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.comment}
          helperText={errors.comment?.message}
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

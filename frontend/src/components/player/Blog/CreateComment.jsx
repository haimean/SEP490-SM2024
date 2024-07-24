import { useForm } from "react-hook-form";
import { Box, TextField, Button } from "@mui/material";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";

const CreateComment = ({ blogId, onCommentCreated }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await CallApi("/api/user/comment", "post", {
        blogId: blogId,
        content: data?.comment,
      });
      toast.success("Bình luận thành công");
      onCommentCreated(blogId);
      reset();
    } catch (error) {
      toast.error("Bình luận thất bại");
      console.error("Error creating comment:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", width: "100%" }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Nhập bình luận của bạn"
        {...register("comment", { required: "Bình luận không được để trống" })}
        error={!!errors.comment}
        helperText={errors.comment?.message}
        sx={{ mr: 1, flex: 1 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Đăng
      </Button>
    </Box>
  );
};

export default CreateComment;

import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const MAX_CHARS = 200;

const CreateComment = ({ blogId, onCommentCreated }) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [charCount, setCharCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const commentValue = watch("comment");

  useEffect(() => {
    const trimmedComment = commentValue?.trim() || "";
    setCharCount(trimmedComment.length);
    setIsButtonDisabled(trimmedComment.length === 0);
  }, [commentValue]);

  const onSubmit = async (data) => {
    try {
      await CallApi("/api/user/comment", "post", {
        blogId: blogId,
        content: data?.comment.trim(),
      });
      toast.success("Bình luận thành công");
      onCommentCreated(blogId);
      reset();
      setCharCount(0);
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
      <Controller
        name="comment"
        control={control}
        rules={{
          required: "Bình luận không được để trống",
          maxLength: {
            value: MAX_CHARS,
            message: `Bình luận không được vượt quá ${MAX_CHARS} ký tự`,
          },
          validate: (value) =>
            value.trim().length > 0 ||
            "Bình luận không thể chỉ chứa khoảng trắng",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            placeholder="Nhập bình luận của bạn"
            error={!!errors.comment}
            helperText={errors.comment?.message}
            sx={{ mr: 1, flex: 1 }}
            inputProps={{ maxLength: MAX_CHARS }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {charCount}/{MAX_CHARS}
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              field.onChange(e);
              setCharCount(e.target.value.trim().length);
            }}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isButtonDisabled}
      >
        Đăng
      </Button>
    </Box>
  );
};

export default CreateComment;
import { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";

const genderOptions = [
  { value: "MALE", label: "Nam" },
  { value: "FEMALE", label: "Nữ" },
  { value: "OTHER", label: "Cả hai" },
];

const levelOptions = [
  { value: "Y", label: "Yếu" },
  { value: "TB", label: "Trung bình" },
  { value: "K", label: "Khá" },
  { value: "T", label: "Tốt" },
  { value: "CN", label: "Chuyên nghiệp" },
];

const CreatePostModal = ({ bookings }) => {
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      numberMember: "",
      genderPost: "",
      level: "",
      price: bookings?.price,
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      const requestData = {
        bookingId: bookings?.id,
        description: data.description,
        numberMember: data.numberMember,
        memberPost: [
          {
            genderPost: data.genderPost,
            level: data.level,
            price: bookings?.price.toString(),
          },
        ],
      };
      console.log(requestData);

      const response = await CallApi("/api/user/post", "post", requestData);
      console.log("API Response:", response);
      handleClose();
      toast.success("Tạo bài đăng mời chơi thành công");
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Tạo bài đăng mời chơi thất bại");
    }
  };

  const handleResetForm = () => {
    reset();
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="success"
        sx={{ mr: 1 }}
        onClick={handleOpen}
      >
        Tạo bài đăng
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Tạo Post Mới
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="description"
              control={control}
              rules={{
                required: "Mô tả là bắt buộc",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mô tả"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
            <Controller
              name="numberMember"
              control={control}
              rules={{
                required: "Số thành viên là bắt buộc",
                min: { value: 1, message: "Số thành viên phải lớn hơn 0" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Số thành viên"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.numberMember}
                  helperText={errors.numberMember?.message}
                />
              )}
            />
            <Controller
              name="genderPost"
              control={control}
              rules={{ required: "Giới tính là bắt buộc" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label=" Tuyển giới tính"
                  fullWidth
                  margin="normal"
                  error={!!errors.genderPost}
                  helperText={errors.genderPost?.message}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="level"
              control={control}
              rules={{ required: "Cấp độ là bắt buộc" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Cấp độ"
                  fullWidth
                  margin="normal"
                  error={!!errors.level}
                  helperText={errors.level?.message}
                >
                  {levelOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="price"
              control={control}
              rules={{
                required: "Giá là bắt buộc",
                min: { value: 0, message: "Giá không thể âm" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Giá"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.price}
                  InputProps={{
                    readOnly: true,
                  }}
                  helperText={errors.price?.message}
                />
              )}
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleResetForm} sx={{ mr: 1 }}>
                Xóa
              </Button>
              <Button type="submit" variant="contained">
                Tạo Post
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CreatePostModal;

/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";
import DialogInfo from "../../common/DialogInfo";

const CreateBlog = ({ open, onClose, onBlogCreated }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      caption: "",
    },
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenDialogInfo, setIsOpenDialogInfo] = useState(false);
  const [titleDialog, setTitleDialog] = useState("");
  const handleCloseDialogInfo = () => {
    setIsOpenDialogInfo(false);
  };
  const handleOpenDialogInfo = (title) => {
    setTitleDialog(title);
    setIsOpenDialogInfo(true);
  };
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("caption", data.caption.trim());
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      const response = await CallApi("/api/user/blog", "post", formData);
      onBlogCreated(response?.data);
      toast.success("Tạo blog thành công");
      handleCancel();
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Tạo blog thất bại");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
    }
  };

  const handleCancel = () => {
    reset();
    setSelectedImage(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "90%",
            sm: "75%",
            md: "60%",
          },
          maxWidth: 1000,
          bgcolor: "background.paper",
          boxShadow: 24,
          pt: 2,
          pb: 3,
          px: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h6">
            Tạo bài đăng trạng thái
          </Typography>
          <IconButton
            onClick={handleCancel}
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="caption"
            control={control}
            rules={{
              required: "Nội dung bài viết không được để trống",
              validate: (value) =>
                value.trim().length > 0 ||
                "Nội dung không thể chỉ chứa khoảng trắng",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                placeholder="Bạn đang nghĩ gì thế?"
                fullWidth
                multiline
                rows={4}
                error={!!error}
                helperText={error?.message}
                inputProps={{ maxLength: 180 }}
              />
            )}
          />
          {selectedImage && (
            <Box sx={{ mt: 2 }}>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </Box>
          )}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                style={{ display: "none" }}
                onChange={(event) => {
                  const file = event?.target?.files[0];
                  if (file && file.size <= 1024 * 1024) {
                    handleImageChange(event);
                  } else {
                    handleOpenDialogInfo(
                      "Kích thước ảnh phải nhỏ hơn hoặc bằng 1MB."
                    );
                    event.target.value = null;
                  }
                }}
              />
              <label htmlFor="image-upload">
                <Button variant="text" component="span">
                  {selectedImage ? "Thay đổi ảnh" : "Thêm ảnh"}
                </Button>
              </label>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Đăng
            </Button>
          </Box>
        </form>
        {isOpenDialogInfo && (
          <DialogInfo
            handleClose={handleCloseDialogInfo}
            open={isOpenDialogInfo}
            title={titleDialog}
          />
        )}
      </Box>
    </Modal>
  );
};

export default CreateBlog;

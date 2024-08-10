import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import DialogInfo from "../../common/DialogInfo";

const NewTypeCourtModal = ({ isOpen, onClose, onSave, typeCourt }) => {
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [isOpenDialogInfo, setIsOpenDialogInfo] = useState(false);
  const [titleDialog, setTitleDialog] = useState("");
  const handleCloseDialogInfo = () => {
    setIsOpenDialogInfo(false);
  };
  const handleOpenDialogInfo = (title) => {
    setTitleDialog(title);
    setIsOpenDialogInfo(true);
  };
  useEffect(() => {
    if (typeCourt) {
      setValue("name", typeCourt.name);
      setValue("description", typeCourt.description);
      setCurrentImage(typeCourt.image || null);
      setSelectedImage(null);
    } else {
      reset();
      setSelectedImage(null);
      setCurrentImage(null);
    }
  }, [typeCourt, reset, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("description", data.description.trim());
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      await onSave(formData, !!typeCourt, typeCourt?.id);
      handleCancel();
    } catch (error) {
      console.error("Error creating/updating type court:", error);
      toast.error("Tạo/Cập nhật loại sân thất bại");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setCurrentImage(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    reset();
    setSelectedImage(null);
    setCurrentImage(null);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleCancel}>
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
          maxWidth: 600,
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
            {typeCourt ? "Cập nhật loại sân" : "Tạo loại sân"}
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
            name="name"
            control={control}
            rules={{
              required: "Tên loại sân không được để trống",
              validate: (value) =>
                value.trim().length > 0 ||
                "Tên không thể chỉ chứa khoảng trắng",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                placeholder="Tên loại sân"
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Mô tả"
                fullWidth
                multiline
                rows={4}
                sx={{ mt: 2 }}
              />
            )}
          />
          {currentImage && (
            <Box sx={{ mt: 2 }}>
              <img
                src={currentImage}
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
                  const file = event.target.files[0];
                  if (file && file.size <= 10 * 1024 * 1024) {
                    handleImageChange(event);
                  } else {
                    handleOpenDialogInfo(
                      "Kích thước ảnh phải nhỏ hơn hoặc bằng 10MB."
                    );
                    event.target.value = null;
                  }
                }}
              />
              <label htmlFor="image-upload">
                <Button variant="text" component="span">
                  {selectedImage || currentImage ? "Thay đổi ảnh" : "Thêm ảnh"}
                </Button>
              </label>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              {typeCourt ? "Cập nhật" : "Tạo"}
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

export default NewTypeCourtModal;

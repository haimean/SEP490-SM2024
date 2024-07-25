import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import CallApi from "../../../service/CallAPI";

const ReportModal = ({ open, onClose, blogId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await CallApi(`/api/user/report-blog/${blogId}`, "post", {
        reason: data?.reason?.trim(),
      });
      toast.success("Báo cáo trạng thái thành công");
      reset();
      onClose();
    } catch (error) {
      toast.error("Báo cáo trạng thái thất bại");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="report-modal-title"
      aria-describedby="report-modal-description"
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
        }}
      >
        <Typography id="report-modal-title" variant="h6" component="h2" mb={2}>
          Lý do báo cáo
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="reason"
            control={control}
            rules={{
              required: "Vui lòng nhập lý do báo cáo",
              validate: (value) =>
                value.trim() !== "" || "Lý do không thể chỉ chứa khoảng trắng",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                label="Lý do báo cáo"
                type="text"
                fullWidth
                variant="outlined"
                error={!!errors.reason}
                helperText={errors.reason?.message}
              />
            )}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Hủy
            </Button>
            <Button type="submit" variant="contained">
              Xác nhận
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ReportModal;

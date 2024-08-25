import {
  Box,
  Button,
  Chip,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CallApi from "../../../service/CallAPI";
import { format } from "date-fns";
import { toast } from "react-toastify";

const BookingDetailHost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [reasonCancel, setReasonCancel] = useState("");

  const now = new Date().getTime();
  const bookingStartTime = booking ? new Date(booking?.startTime).getTime() : 0;
  const canCancel = bookingStartTime > now;

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        const result = await CallApi(
          `/api/host/history-booking/detail/${id}`,
          "get"
        );
        setBooking(result?.data);
      } catch (error) {
        console.error("Error fetching booking detail:", error);
        toast.error("Lỗi khi tải thông tin đặt sân");
      }
    };
    fetchBookingDetail();
  }, [id]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setReasonCancel("");
  };

  const handleCancel = async () => {
    if (!reasonCancel.trim()) {
      toast.error("Vui lòng nhập lý do hủy");
      return;
    }

    const requestData = {
      reasonCancell: reasonCancel,
      bookingId: booking?.id,
    };

    try {
      await CallApi(`/api/host/history-booking/cancel`, "put", requestData);
      navigate(`/host/booking-history/${booking?.Court?.branchesId}`);
      toast.success("Hủy thành công trận đã đặt");
    } catch (error) {
      toast.error("Lỗi khi hủy đặt sân:", error);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  if (!booking) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        margin: "auto",
        mt: { xs: 8, sm: 8, md: 16 },
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: { sm: "720px", md: "1170px" },
      }}
    >
      <Typography variant="h6">Chi tiết đặt sân</Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {booking?.Court && (
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Thông tin sân</Typography>
              <Typography>
                Tên sân: {""}
                <Link
                  to={`/host/branch/${booking?.Court?.Branches?.id}/court/${booking?.Court?.id}`}
                  style={{
                    textDecoration: "underline",
                    color: "#1976d2",
                    fontWeight: "bold",
                  }}
                >
                  {booking?.Court?.name}
                </Link>
              </Typography>
              <Typography>
                Cơ sở: {""}
                <Link
                  to={`/host/branch/${booking?.Court?.Branches?.id}`}
                  style={{
                    textDecoration: "underline",
                    color: "#1976d2",
                    fontWeight: "bold",
                  }}
                >
                  {booking?.Court?.Branches?.name}
                </Link>
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Thông tin người đặt</Typography>
            <Typography>Họ và tên: {booking?.bookingInfo?.name}</Typography>
            <Typography>
              Số điện thoại: {booking?.bookingInfo?.numberPhone}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Thông tin đặt sân</Typography>
            <Typography>
              Ngày: {format(new Date(booking?.startTime), "dd/MM/yyyy")}
            </Typography>
            <Typography>
              Thời gian: {format(new Date(booking?.startTime), "HH:mm")} -{" "}
              {format(new Date(booking?.endTime), "HH:mm")}
            </Typography>
            <Typography>
              Giá: {booking?.price?.toLocaleString("vi-VN")} VNĐ
            </Typography>
            <Chip
              label={
                new Date(booking?.startTime) > new Date()
                  ? "Sắp diễn ra"
                  : "Đã diễn ra"
              }
              color={
                new Date(booking?.startTime) > new Date()
                  ? "primary"
                  : "default"
              }
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>

        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          {/* <Button
            component={Link}
            to={`/host/booking-history/${branchId}`}
            variant="contained"
            color="info"
            size="small"
          >
            Quay lại
          </Button> */}
          {canCancel && (
            <Button
              onClick={handleOpenModal}
              variant="contained"
              color="error"
              size="small"
            >
              Hủy đặt sân
            </Button>
          )}
        </Box>
      </Paper>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Lý do hủy đặt sân
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={reasonCancel}
            onChange={(e) => setReasonCancel(e.target.value)}
            placeholder="Nhập lý do hủy đặt sân"
            margin="normal"
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
              Hủy bỏ
            </Button>
            <Button onClick={handleCancel} variant="contained" color="error">
              Xác nhận hủy
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BookingDetailHost;

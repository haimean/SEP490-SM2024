import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Paper, Grid, Button, Chip } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { format } from "date-fns";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const now = new Date().getTime();
  const bookingStartTime = new Date(booking?.startTime).getTime();
  const canCancel = bookingStartTime > now;

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        const result = await CallApi(`/api/user/booking/detail/${id}`, "get");
        setBooking(result?.data);
      } catch (error) {
        console.error("Error fetching booking detail:", error);
      }
    };
    fetchBookingDetail();
  }, [id]);

  const handleCancel = async () => {
    const isConfirmed = window.confirm(
      "Bạn có muốn hủy lịch thi đấu này không?"
    );
    if (isConfirmed) {
      try {
        await CallApi(`/api/user/booking/${booking?.id}`, "delete");
        navigate("/player/booking-history");
        toast.success("Xóa thành công trận đã đặt");
      } catch (error) {
        toast.error("Lỗi khi hủy đặt sân:", error);
      }
    }
  };

  if (!booking)
    return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        margin: "auto",
        mt: { xs: 1, sm: 2, md: 2 },
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: { sm: "720px", md: "1170px" },
      }}
    >
      <div className="flex items-center mb-2 justify-between">
        <Box
          component={Link}
          to="/player/booking-history"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            cursor: "pointer",
            color: "gray",
          }}
        >
          <ArrowBack fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="h6">QUAY LẠI</Typography>
        </Box>
        <Typography variant="h6">Chi tiết đặt sân {booking.id}</Typography>
      </div>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
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
              Giá: {booking.price.toLocaleString("vi-VN")} VNĐ
            </Typography>
            <Chip
              label={
                new Date(booking.startTime) > new Date()
                  ? "Sắp diễn ra"
                  : "Đã diễn ra"
              }
              color={
                new Date(booking.startTime) > new Date() ? "primary" : "default"
              }
              sx={{ mt: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Thông tin người đặt</Typography>
            <Typography>Tên: {booking.bookingInfo?.name}</Typography>
            <Typography>
              Số điện thoại: {booking.bookingInfo?.numberPhone}
            </Typography>
          </Grid>

          {booking.Court && (
            <Grid item xs={12}>
              <Typography variant="h6">Thông tin sân</Typography>
              <Typography>Tên sân: {booking.Court.name}</Typography>
              {/* Thêm các thông tin khác về sân nếu có */}
            </Grid>
          )}
        </Grid>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          {canCancel && (
            <Button
              onClick={handleCancel}
              variant="contained"
              color="error"
              size="small"
            >
              Hủy đặt sân
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingDetail;

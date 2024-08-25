import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CallApi from "../../../service/CallAPI";
import DialogAccept from "../../common/DialogAccept";
import Loading from "../../common/Loading";
import { format } from "date-fns";
import { toast } from "react-toastify";

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [open, setOpen] = useState(false);
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
  console.log(booking);

  const handleCancel = async () => {
    if (open) {
      try {
        await CallApi(`/api/user/booking/${booking?.id}`, "delete");
        setOpen(false);
        navigate("/player/booking-history");
        toast.success("Hủy thành công trận đã đặt");
      } catch (error) {
        toast.error("Lỗi khi hủy đặt sân:", error);
      }
    }
  };

  if (!booking) return <Loading />;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        margin: "auto",
        mt: { xs: 1, sm: 2, md: 2 },
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: { sm: "720px", md: "1170px" },
      }}
    >
      <Typography variant="h6">Chi tiết đặt sân {booking?.id}</Typography>
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
              Giá: {booking?.price?.toLocaleString("vi-VN")} VNĐ
            </Typography>
            <Chip
              label={
                new Date(booking?.startTime || new Date()) > new Date()
                  ? "Sắp diễn ra"
                  : "Đã diễn ra"
              }
              color={
                new Date(booking.startTime || new Date()) > new Date()
                  ? "primary"
                  : "default"
              }
              sx={{ mt: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Thông tin người đặt</Typography>
            <Typography>Họ và tên: {booking?.bookingInfo?.name}</Typography>
            <Typography>
              Số điện thoại: {booking?.bookingInfo?.numberPhone}
            </Typography>
          </Grid>

          {booking.Court && (
            <Grid item xs={12}>
              <Typography variant="h6">Thông tin sân</Typography>
              <Typography>Tên sân: {booking?.Court?.name}</Typography>
              <Typography>Cơ sở: {booking?.Court?.Branches?.name}</Typography>
              <Typography>
                Liên hệ: {booking?.Court?.Branches?.phone}
              </Typography>
              <Typography>Email: {booking?.Court?.Branches?.email}</Typography>
              <Typography>
                Địa chỉ: {booking?.Court?.Branches?.address?.detail}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button
            component={Link}
            to={"/player/booking-history"}
            variant="contained"
            color="info"
            size="small"
          >
            Quay lại
          </Button>
          {canCancel && (
            <Button
              onClick={handleClickOpen}
              variant="contained"
              color="error"
              size="small"
            >
              Hủy đặt sân
            </Button>
          )}
        </Box>
      </Paper>
      {open && (
        <DialogAccept
          handleClose={handleClose}
          open={open}
          title={"Bạn có muốn hủy lịch thi đấu này không?"}
          handleAccept={handleCancel}
        />
      )}
    </Box>
  );
};

export default BookingDetail;

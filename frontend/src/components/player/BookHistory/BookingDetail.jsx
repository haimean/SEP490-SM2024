import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Paper, Grid, Button, Chip } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { format } from "date-fns";

const BookingDetail = () => {
  const { id } = useParams();
  // const [booking, setBooking] = useState(null);

  // useEffect(() => {
  //   const fetchBookingDetail = async () => {
  //     try {
  //       const data = await getBookingDetail(id);
  //       setBooking(data);
  //     } catch (error) {
  //       console.error("Error fetching booking detail:", error);
  //     }
  //   };

  //   fetchBookingDetail();
  // }, [id]);
  const booking = {
    id: 2,
    createdAt: "2024-07-11T10:15:00Z",
    updatedAt: "2024-07-11T10:15:00Z",
    accountId: 102,
    Court: {
      id: 2,
      name: "Sân Hòa Bình B",
    },
    courtId: 2,
    dateTime: "2024-06-18T18:30:00Z",
    startTime: "2024-06-18T18:30:00Z",
    endTime: "2024-06-18T20:30:00Z",
    price: 600000,
    bookingInfo: {
      id: 2,
      name: "Trần Thị B",
      numberPhone: "0912345678",
    },
  };

  if (!booking) return <Typography>Loading...</Typography>;

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
            color: "inherit",
            cursor: "pointer",
            color: "gray"
          }}
        >
          <ArrowBack fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="h6">QUAY LẠI</Typography>
        </Box>
        <Typography variant="h6">
          Chi tiết đặt sân {booking.id}
        </Typography>
      </div>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Thông tin đặt sân</Typography>
            <Typography>
              Ngày: {format(new Date(booking.dateTime), "dd/MM/yyyy")}
            </Typography>
            <Typography>
              Thời gian: {format(new Date(booking.startTime), "HH:mm")} -{" "}
              {format(new Date(booking.endTime), "HH:mm")}
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
          <Button variant="contained" color="primary">
            Đặt lại
          </Button>
          {new Date(booking.startTime) > new Date() && (
            <Button variant="contained" color="error" sx={{ ml: 2 }}>
              Hủy đặt sân
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingDetail;

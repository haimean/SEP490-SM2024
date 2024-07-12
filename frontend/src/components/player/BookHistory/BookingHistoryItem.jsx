import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const BookingHistoryItem = ({ booking, onCancelSuccess }) => {
  const now = new Date().getTime();
  const bookingStartTime = new Date(booking.startTime).getTime();
  const canCancel = bookingStartTime > now;


  // const handleCancel = async () => {
  //   try {
  //     // Gọi API để hủy đặt sân
  //     // await cancelBooking(booking.id);
  //     onCancelSuccess(booking.id);
  //     // Hiển thị thông báo thành công
  //   } catch (error) {
  //     // Xử lý lỗi và hiển thị thông báo lỗi
  //     console.error("Lỗi khi hủy đặt sân:", error);
  //   }
  // };

  return (
    <Paper elevation={3} sx={{ mb: 2, p: 2, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary">
            Đặt sân {booking.id} - {format(bookingStartTime, "dd/MM/yyyy")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Thời gian thuê: {format(bookingStartTime, "HH:mm")} -{" "}
            {format(new Date(booking.endTime), "HH:mm")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
            }}
          >
            <Box sx={{ flex: 1 }} /> {/* Spacer */}
            <Button
              component={Link}
              to={`/player/booking-history/${booking.id}`}
              variant="contained"
              size="small"
              sx={{ mr: canCancel ? 1 : 0 }}
            >
              Chi tiết
            </Button>
            {canCancel && (
              <Button variant="contained" color="error" size="small">
                Hủy đặt sân
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BookingHistoryItem;

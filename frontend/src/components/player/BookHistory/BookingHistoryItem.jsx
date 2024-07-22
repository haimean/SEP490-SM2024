import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CallApi from "../../../service/CallAPI";
import CreatePostModal from "../../../components/player/Post/CreatePostModal";

const BookingsHistoryItem = ({ bookings, onCancelSuccess }) => {
  const now = new Date().getTime();
  const bookingStartTime = new Date(bookings?.startTime).getTime();
  const canCancel = bookingStartTime > now;

  const handleCancel = async () => {
    const isConfirmed = window.confirm(
      "Bạn có muốn hủy lịch thi đấu này không?"
    );
    if (isConfirmed) {
      try {
        await CallApi(`/api/user/booking/${bookings?.id}`, "delete");
        onCancelSuccess(bookings?.id);
        toast.success("Xóa thành công trận đã đặt");
      } catch (error) {
        toast.error("Lỗi khi hủy đặt sân:", error);
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ mb: 2, p: 2, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary">
            Đặt sân {bookings?.id} - {format(bookingStartTime, "dd/MM/yyyy")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Thời gian thuê: {format(bookingStartTime, "HH:mm")} -{" "}
            {format(new Date(bookings?.endTime), "HH:mm")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Giá: {bookings?.price}
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
              to={`/player/booking-history/${bookings?.id}`}
              variant="contained"
              size="small"
              sx={{ mr: canCancel ? 1 : 0 }}
            >
              Chi tiết
            </Button>
            {canCancel && !bookings.post && (
              <CreatePostModal bookings={bookings} />
            )}
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BookingsHistoryItem;

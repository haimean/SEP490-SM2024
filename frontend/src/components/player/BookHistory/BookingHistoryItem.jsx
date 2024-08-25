/* eslint-disable react/prop-types */

import { Box, Button, Grid, Paper, Typography } from "@mui/material";

import CallApi from "../../../service/CallAPI";
import CreatePostModal from "../../../components/player/Post/CreatePostModal";
import { Link } from "react-router-dom";
import { dateUntil } from "../../../utils/date";
import { format } from "date-fns";
import { toast } from "react-toastify";
import useDialogConfirm from "../../../hooks/useDialogConfirm";

const BookingsHistoryItem = ({ bookings, onCancelSuccess }) => {
  const now = new Date().getTime();
  const bookingStartTime = new Date(bookings?.startTime).getTime();
  const canCancel = bookingStartTime > now;
  const { openDialog, DialogComponent } = useDialogConfirm();

  const handleCancel = async () => {
    openDialog("Bạn có muốn hủy lịch thi đấu này không?", async () => {
      try {
        await CallApi(`/api/user/booking/${bookings?.id}`, "delete");
        onCancelSuccess();
        toast.success("Hủy thành công trận đã đặt");
      } catch (error) {
        toast.error("Lỗi khi hủy đặt sân:", error);
      }
    });
  };

  return (
    <Paper elevation={3} sx={{ mb: 2, p: 2, width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary">
            Sân {bookings?.Court?.name} - Cơ sở{" "}
            {bookings?.Court?.Branches?.name} -{" "}
            {format(bookingStartTime, "dd-MM-yyyy")}
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Thời gian: {dateUntil.getStringTime(bookings?.startTime)} -{" "}
                {dateUntil.getStringTime(bookings?.endTime)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Quản lý sân:{" "}
                {bookings?.Court?.Branches?.account?.user?.fullName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Giá: {bookings?.price?.toLocaleString("vi-VN")} VND
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Số điện thoại: {bookings?.Court?.Branches?.phone}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="body2" color="text.secondary">
            Địa chỉ: {bookings?.Court?.Branches?.address?.detail}
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
            {!bookings.isDelete && (
              <Button
                component={Link}
                to={`/player/booking-history/${bookings?.id}`}
                variant="contained"
                size="small"
                sx={{ mr: canCancel || bookings?.post ? 1 : 0 }}
              >
                Chi tiết
              </Button>
            )}
            {canCancel && !bookings.isDelete && !bookings?.post && (
              <CreatePostModal bookings={bookings} />
            )}
            {bookings?.post && !bookings.isDelete && (
              <Button
                component={Link}
                to={`/post/${bookings?.post?.id}`}
                variant="contained"
                color="secondary"
                size="small"
                sx={{ mr: 1 }}
              >
                Xem bài đăng
              </Button>
            )}
            {canCancel && !bookings.isDelete && (
              <Button
                onClick={handleCancel}
                variant="contained"
                color="error"
                size="small"
                sx={{ mr: 1 }}
              >
                Hủy đặt sân
              </Button>
            )}
            {bookings.isDelete && (
              <Button variant="contained" color="error" size="small" disabled>
                Đã hủy đặt sân
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
      <DialogComponent />
    </Paper>
  );
};

export default BookingsHistoryItem;

/* eslint-disable react/prop-types */

import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import CallApi from "../../../service/CallAPI";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useState } from "react";

const BookingsHistoryItemHost = ({ bookings, onCancelSuccess, branchId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [reasonCancel, setReasonCancel] = useState("");

  const now = new Date().getTime();
  const bookingStartTime = new Date(bookings?.startTime).getTime();
  const canCancel = bookingStartTime > now;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

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
      bookingId: bookings?.id,
    };

    try {
      await CallApi(`/api/host/history-booking/cancel`, "put", requestData);
      onCancelSuccess(bookings?.id);
      toast.success("Hủy thành công trận đã đặt");
      handleCloseModal();
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

  return (
    <Paper elevation={3} sx={{ mb: 2, p: 2, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary">
            Đặt sân {bookings?.Court?.name} -{" "}
            {format(bookingStartTime, "dd/MM/yyyy")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Thời gian thuê: {format(bookingStartTime, "HH:mm")} -{" "}
            {format(new Date(bookings?.endTime), "HH:mm")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Giá: {bookings?.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Người thuê: {bookings?.bookingInfo?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            SĐT: {bookings?.bookingInfo?.numberPhone}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Box sx={{ flex: 1 }} />
            <Button
              component={Link}
              to={`/host/booking-history/detail/${bookings?.id}`}
              state={{ branchId: branchId }}
              variant="contained"
              size="small"
              sx={{ mr: canCancel ? 1 : 0 }}
            >
              Chi tiết
            </Button>
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
        </Grid>
      </Grid>

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
    </Paper>
  );
};

export default BookingsHistoryItemHost;

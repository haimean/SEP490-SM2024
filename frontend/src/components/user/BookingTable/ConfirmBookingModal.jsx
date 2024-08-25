/* eslint-disable react/prop-types */

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import  { useEffect, useState } from "react";

import CallApi from "../../../service/CallAPI";
import RedirectConfirmModal from "./RedirectConfirmModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ConfirmBookingModal = ({
  isOpen,
  onRequestClose,
  courtId,
  selectedEvents,
  refreshData,
  resetEvents,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRedirectConfirmOpen, setIsRedirectConfirmOpen] = useState(false);
  const { accountId } = useSelector((state) => state.user);
  const getProfile = async () => {
    try {
      const result = await CallApi(`/api/user/profile/${accountId}`);
      setName(result?.data?.user?.fullName);
      setPhone(result?.data?.user?.numberPhone);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const navigate = useNavigate();

  const pad = (n) => n.toString().padStart(2, "0");

  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    const payload = selectedEvents?.map((event) => ({
      courtId,
      startTime: formatDateTime(event.start),
      endTime: formatDateTime(event.end),
      price: event.price,
      name,
      numberPhone: phone,
    }));
    const data = {
      data: payload,
    };

    console.log(selectedEvents);
    console.log(data);
    try {
      const response = await CallApi("/api/user/booking", "post", data, {});
      console.log(response);
      toast.success("Đặt sân thành công!");
      onRequestClose();
      setTimeout(async () => {
        resetEvents();
        await refreshData(courtId);
      }, 10);
      setName("");
      setPhone("");
      setIsRedirectConfirmOpen(true);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Đã có lỗi xảy ra khi đặt sân"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseRedirectConfirm = () => {
    setIsRedirectConfirmOpen(false);
  };

  const handleConfirmRedirect = () => {
    setIsRedirectConfirmOpen(false);
    navigate("/player/booking-history"); // Thay '/your-target-url' bằng URL thực tế của bạn
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={!loading ? onRequestClose : null}
        aria-labelledby="booking-modal-title"
        aria-describedby="booking-modal-description"
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 1,
            maxWidth: 500,
            mx: "auto",
            mt: 10,
            position: "relative",
          }}
        >
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Typography
            id="booking-modal-title"
            variant="h6"
            component="h2"
            className="!mb-4"
          >
            Nhập thông tin người đặt
          </Typography>
          <TextField
            label="Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            className="!mb-4"
          />
          <TextField
            label="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            className="!mb-4"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              onClick={handleConfirmBooking}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Xác nhận
            </Button>
            <Button
              onClick={onRequestClose}
              variant="outlined"
              color="primary"
              disabled={loading}
            >
              Đóng
            </Button>
          </Box>
        </Box>
      </Modal>
      <RedirectConfirmModal
        isOpen={isRedirectConfirmOpen}
        onClose={handleCloseRedirectConfirm}
        onConfirm={handleConfirmRedirect}
      />
    </>
  );
};

export default ConfirmBookingModal;

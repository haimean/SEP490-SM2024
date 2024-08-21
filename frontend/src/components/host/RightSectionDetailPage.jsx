// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Typography, Grid, Paper, Button } from "@mui/material";
import BookingModal from "../user/BookingTable/BookingModal";
import { AccountBox, Email, LocationOn, Phone } from "@mui/icons-material";
import { useSelector } from 'react-redux';
import LoginModal from "../auth/LoginModal";
import { toast } from "react-toastify";
const RightSectionDetailPage = ({ court, branch }) => {
  const [openModal, setOpenModal] = useState(false);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const user = useSelector((state) => state.user.user);

  const handleBookClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      toast.error("Bạn chưa đăng nhập!");
      setOpenLoginModal(true);
    }
  };
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ position: "sticky", top: 100, p: 2 }}>
      <Typography variant="h6" component="div" gutterBottom>
          Thông tin liên hệ:
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          <AccountBox style={{ marginRight: '8px' }} />{branch?.account?.user?.fullName}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <Phone style={{ marginRight: '8px' }} />
          {branch?.phone}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <Email style={{ marginRight: '8px' }} />
          {branch?.email}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <LocationOn style={{ marginRight: '8px' }} />
          {branch?.address?.detail}
        </Typography>
        {/* {map} */}
        <Button
          variant="contained"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={handleBookClick}
        >
          Đặt sân
        </Button>
      </Paper>
      <BookingModal open={openModal} onClose={handleCloseModal} court={court} />
      <LoginModal open={openLoginModal} onClose={handleCloseLoginModal} />
    </Grid>
  );
};

export default RightSectionDetailPage;

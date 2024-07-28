// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import { Typography, Grid, Paper, Button } from "@mui/material";
import BookingModal from "../user/BookingTable/BookingModal";
const RightSectionDetailPage = ({court}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleBookClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ position: "sticky", top: 100, p: 2 }} className="flex">
        <Button
          variant="contained"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={handleBookClick}
        >
          Đặt sân
        </Button>
      </Paper>
      <BookingModal open={openModal} onClose={handleCloseModal} court={court} />
    </Grid>
  );
};

export default RightSectionDetailPage;

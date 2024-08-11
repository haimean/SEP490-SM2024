import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarModalComponent from "./BookingCalendar";

const BookingModal = ({ open, onClose, courtId, court }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 h-5/6 bg-white border border-gray-300 shadow-lg p-4 rounded-lg overflow-auto">
        <IconButton onClick={onClose} className="!absolute !top-2 !right-2">
          <CloseIcon />
        </IconButton>
        <Box display="flex" alignItems="center">
          <Box className="w-1/3">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Sân: {court?.name}
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cơ sở: {court?.Branches?.name}
            </Typography>
          </Box>
          <Box
            display="flex"
            className="w-1/3"
            alignItems="center"
            justifyContent="center"
          >
            <Box display="flex" alignItems="center" mr={2}>
              <Box width={16} height={16} bgcolor="rgb(70, 130, 180)" mr={1} />
              <Typography variant="body2">
                Ca khách đặt trên hệ thống
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Box width={16} height={16} bgcolor="rgb(34, 139, 34)" mr={1} />
              <Typography variant="body2">Ca tự đặt</Typography>
            </Box>
          </Box>
        </Box>
        <CalendarModalComponent courtId={court.id} />
      </Box>
    </Modal>
  );
};

export default BookingModal;

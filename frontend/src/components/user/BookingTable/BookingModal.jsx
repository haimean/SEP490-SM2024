import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateEventWithNoOverlap from './BookingCalendar';

const BookingModal = ({ open, onClose, court }) => {
  console.log(court);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 h-5/6 bg-white border border-gray-300 shadow-lg p-4 rounded-lg overflow-auto">
        <IconButton
          onClick={onClose}
          className="!absolute !top-2 !right-2"
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {court.name}
        </Typography>
        <CreateEventWithNoOverlap courtId={court.id} />
      </Box>
    </Modal>
  );
};

export default BookingModal;

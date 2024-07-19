// BookingModal.jsx
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import CreateEventWithNoOverlap from './BookingCalendar';

const BookingModal = ({ open, onClose, courtId }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%', // Đặt width là 90% để modal không sát cạnh màn hình
        height: '90%', // Đặt height là 90% để modal không sát cạnh màn hình
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflow: 'auto' // Đảm bảo nội dung modal có thể scroll nếu vượt quá kích thước
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Đặt sân: {courtId}
        </Typography>
        <CreateEventWithNoOverlap courtId={courtId} />
        <Button onClick={onClose} variant="contained" color="secondary" style={{ marginTop: '20px' }}>
          Đóng
        </Button>
      </Box>
    </Modal>
  );
};

export default BookingModal;

import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  const [reasonCancell, setReasonCancell] = useState('');

  const handleDelete = () => {
    onDelete(reasonCancell);
    setReasonCancell('');
  };

  const handleClose = () => {
    setReasonCancell('');
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography variant="h6" component="h2">
          Xác nhận xóa ca đặt
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Lý do hủy"
          name="reasonCancell"
          value={reasonCancell}
          onChange={(e) => setReasonCancell(e.target.value)}
        />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleDelete}>
            Xác nhận
          </Button>
          <Button variant="outlined" onClick={onClose} sx={{ ml: 2 }}>
            Hủy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;

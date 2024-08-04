import React from 'react';
import { Modal as MuiModal, Box } from '@mui/material';

const Modal = ({ open, onClose, children }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-lg">
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;

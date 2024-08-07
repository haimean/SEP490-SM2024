import React from 'react';
import { Modal, Box } from '@mui/material';

const ImageModal = ({ isOpen, onClose, image }) => (
  <Modal open={isOpen} onClose={onClose}>
    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
      <img src={image} alt="Selected" className="max-h-screen max-w-screen" />
    </Box>
  </Modal>
);

export default ImageModal;

import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const RedirectConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 1, maxWidth: 500, mx: 'auto', mt: 10 }}>
        <Typography variant="h6" component="h2" className="!mb-4">
          Bạn có muốn tạo bài đăng tìm người chơi?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="primary"
          >
            Có
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            color="primary"
          >
            Không
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RedirectConfirmModal;

import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import SignInForm from './SignInForm.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const LoginModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded shadow-lg">
        <GoogleOAuthProvider clientId="886827014286-uueubia01arg46h6h6ua0ve061g3dl7e.apps.googleusercontent.com">
          <SignInForm />
        </GoogleOAuthProvider>
      </Box>
    </Modal>
  );
};

export default LoginModal;

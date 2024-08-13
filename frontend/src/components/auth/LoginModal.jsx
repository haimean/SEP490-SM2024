import { Modal, Box } from "@mui/material";
import SignInForm from "./SignInForm.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const LoginModal = ({ open, onClose }) => {
  const handleSuccess = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded shadow-lg">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <SignInForm isModal={true} onSuccess={handleSuccess} />
        </GoogleOAuthProvider>
      </Box>
    </Modal>
  );
};

export default LoginModal;

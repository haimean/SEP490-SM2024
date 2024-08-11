import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import QRCode from "qrcode.react";

const PaymentCreateBranch = ({
  open,
  handleClose,
  branchName,
  onConfirmPayment,
}) => {
  const [qrValue] = useState("https://example.com/payment"); // URL thanh toán thực tế

  const handleConfirmAndClose = () => {
    onConfirmPayment();
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="payment-modal-title"
      aria-describedby="payment-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 500,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          id="payment-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
        >
          Thanh toán cho cơ sở {branchName}
        </Typography>
        <Typography
          id="payment-modal-description"
          sx={{ mt: 2 }}
          textAlign="center"
        >
          Vui lòng quét mã QR để thanh toán
        </Typography>
        <Typography
          id="payment-modal-description"
          sx={{ mt: 2, color: "red" }}
          textAlign="center"
        >
          Admin sẽ duyệt cơ sở khi nhận được số tiền đã thanh toán và cơ sở đủ
          điều kiện kinh doanh
        </Typography>
        <Box sx={{ my: 2 }}>
          <QRCode value={qrValue} size={200} />
        </Box>
        <Button onClick={handleConfirmAndClose} variant="contained">
          Xác nhận đã thanh toán
        </Button>
      </Box>
    </Modal>
  );
};

export default PaymentCreateBranch;

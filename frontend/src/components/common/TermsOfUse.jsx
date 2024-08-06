import { Box, Button, Modal, Typography } from "@mui/material";

const TermsOfUse = ({ handleOpen, handleClose }) => {
  return (
    <Modal
      open={handleOpen}
      onClose={handleClose}
      aria-labelledby="terms-modal-title"
      aria-describedby="terms-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography id="terms-modal-title" variant="h6" component="h2">
          Điều khoản sử dụng
        </Typography>
        <Typography id="terms-modal-description" sx={{ mt: 2 }}>
          Đây là các điều khoản sử dụng cho CourtConnect. Bằng cách sử dụng dịch
          vụ của chúng tôi, bạn đồng ý với các điều khoản sau đây:
          <ol>
            <li>
              1. Bạn phải tuân thủ tất cả các luật và quy định hiện
              hành.
            </li>
            <li>
              2. Bạn không được sử dụng dịch vụ của chúng tôi cho các
              mục đích bất hợp pháp.
            </li>
            <li>
              3. Chúng tôi có quyền chấm dứt tài khoản của bạn nếu
              bạn vi phạm các điều khoản này.
            </li>
            <li>
              4. Chúng tôi không chịu trách nhiệm về bất kỳ tổn thất
              hoặc thiệt hại nào phát sinh từ việc sử dụng dịch vụ của chúng
              tôi.
            </li>
            <li>
              5. Các điều khoản này có thể được cập nhật theo thời
              gian, và bạn có trách nhiệm kiểm tra các bản cập nhật này.
            </li>
          </ol>
        </Typography>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{ mt: 2, float: "right" }}
        >
          Đóng
        </Button>
      </Box>
    </Modal>
  );
};

export default TermsOfUse;

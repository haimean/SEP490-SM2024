/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function TutorialUsing({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Bước 1</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Số lần ở đây là số lần người chơi trong 1 lần đặt để nhận giá giao lưu
          tưởng ứng với số lần chơi (Mạc định của kiểu sân là 1 vì tối thiểu đặt
          sân chơi luôn là 1 lần, còn lần sau trở đi, bạn có thể đặt số lần mới
          khác 1 để có thể cho người chơi có giá giao lưu khác khi không vượt
          quá số lần cho phép)
        </DialogContentText>
      </DialogContent>
      <DialogTitle id="alert-dialog-title">Bước 2</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Mốc thời gian 1 và 2 là mốc thời gian trong 1 ngày mốc thời gian từ
          lần sau trờ đi sẽ tình từ mốc đầu tiên (0h tới môc tương khi nhâp lần
          đầu) VD: bạn nhập 7h thì ta sẽ có mốc thời gian là 0 - 7h và 7h-24h
          khi chọn thêm mốc thời gian thì chúng ta có thể tạo thêm mốc thời gian
          cho việc tạo giá giao lưu
        </DialogContentText>
      </DialogContent>
      <DialogTitle id="alert-dialog-title">Bước 3</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Tạo giá cho từng khoảng giờ
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Xong</Button>
      </DialogActions>
    </Dialog>
  );
}

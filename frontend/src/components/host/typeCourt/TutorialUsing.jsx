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
      <DialogTitle id="alert-dialog-title">Thiết lập giá</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Hãy nhấn <span className="font-bold">Thêm mới bảng giá</span> để thiết
          lập giá
          <br />- Bạn có thể tạo ra chính sách giá cho người chơi dựa theo số ca
          họ đặt trong 1 lần bằng cách nhập số ca ở{" "}
          <span className="font-bold">bước 1</span> sau đó thiết lập thời gian
          và giá tương ứng (thiệt lập giá cho số ca bằng 1 là bắt buộc)
          <br />- Nếu sân bạn có mức giá theo các mốc thời gian hãy nhập mốc
          thời gian này tại <span className="font-bold">bước 2</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đã hiểu</Button>
      </DialogActions>
    </Dialog>
  );
}

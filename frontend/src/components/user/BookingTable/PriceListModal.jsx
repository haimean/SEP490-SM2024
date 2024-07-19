// PriceListModal.jsx
import React from 'react';
import { Modal, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { format } from 'date-fns';

const PriceListModal = ({ isOpen, onRequestClose, priceList, repeatPriceListWeekly, repeatPriceListDaily }) => {

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <Modal open={isOpen} onClose={onRequestClose} aria-labelledby="price-list-modal-title" aria-describedby="price-list-modal-description">
      <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 1, maxWidth: 700, mx: 'auto', mt: 10 }}>
        <Typography id="price-list-modal-title" variant="h6" component="h2" className="mb-4">
          Bảng Giá
        </Typography>

        <Typography variant="subtitle1" component="h3" className="!mb-4">
          Giá theo giờ:
        </Typography>
        <TableContainer component={Paper} className="mb-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bắt đầu</TableCell>
                <TableCell>Kết thúc</TableCell>
                <TableCell>Giá (VND)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {priceList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{format(new Date(item.start), 'HH:mm')}</TableCell>
                  <TableCell>{format(new Date(item.end), 'HH:mm')}</TableCell>
                  <TableCell>{formatPrice(item.price)}/1h</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography>Đặt từ 5 ca trở lên: {formatPrice(repeatPriceListWeekly[0]?.price)}/1h</Typography>
        <Typography>Đặt từ 10 ca trở lên: {formatPrice(repeatPriceListDaily[0]?.price)}/1h</Typography>
        <Button onClick={onRequestClose} variant="contained" color="primary" className='!mt-4'>
          Đóng
        </Button>
      </Box>
    </Modal>
  );
};

export default PriceListModal;

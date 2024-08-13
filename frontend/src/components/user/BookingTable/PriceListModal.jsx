import React from 'react';
import { Modal, Box, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';

const PriceListModal = ({ isOpen, onRequestClose, priceLists }) => {

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const sortPriceListsByTime = (list) => {
    return list.sort((a, b) => {
      const timeA = new Date(a.start).getHours() * 60 + new Date(a.start).getMinutes();
      const timeB = new Date(b.start).getHours() * 60 + new Date(b.start).getMinutes();
      return timeA - timeB;
    });
  };

  return (
    <Modal open={isOpen} onClose={onRequestClose} aria-labelledby="price-list-modal-title" aria-describedby="price-list-modal-description">
      <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 1, maxWidth: 700, mx: 'auto', mt: 10, position: 'relative' }}>
        <Typography id="price-list-modal-title" variant="h6" component="h2" className="mb-4">
          Bảng Giá
        </Typography>
        <IconButton
          onClick={onRequestClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {Object.keys(priceLists).map(times =>
        {
          const sortedList = sortPriceListsByTime(priceLists[times]);
          return (
            <div key={times} className="mb-4">
              <Typography variant="subtitle1" component="h3" className="mb-2">
                {times === '1' ? `Giá cho ${times} ca:` : `Giá khi đặt từ ${times} ca trở lên`}
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
                    {sortedList.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{format(new Date(item.start), 'HH:mm')}</TableCell>
                        <TableCell>{format(new Date(item.end), 'HH:mm')}</TableCell>
                        <TableCell>{formatPrice(item.price)}/1h</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )
        }
        )}
      </Box>
    </Modal>
  );
};

export default PriceListModal;

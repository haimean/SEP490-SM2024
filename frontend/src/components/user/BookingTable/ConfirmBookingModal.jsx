import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, Backdrop } from '@mui/material';
import { toast } from 'react-toastify';
import CallApi from '../../../service/CallAPI';

const ConfirmBookingModal = ({ isOpen, onRequestClose, courtId, selectedEvents, refreshData, resetEvents }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false); 

  const pad = (n) => n.toString().padStart(2, '0');

  const addHours = (date, hours) => {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  };

  const formatDateTime = (date) => {
    const newDate = addHours(date, 7);
    const year = newDate.getFullYear();
    const month = pad(newDate.getMonth() + 1);
    const day = pad(newDate.getDate());
    const hours = pad(newDate.getHours());
    const minutes = pad(newDate.getMinutes());
    const seconds = pad(newDate.getSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  };

  const handleConfirmBooking = async () => {
    setLoading(true); 
    const payload = selectedEvents.map(event => ({
      courtId,
      startTime: formatDateTime(event.start),
      endTime: formatDateTime(event.end), 
      price: event.price,
      name,
      numberPhone: phone
    }));
    const data = {
      "data": payload
    };

    console.log(selectedEvents);
    console.log(data);
    try {
      const response = await CallApi("/api/user/booking", "post", data, {});
      console.log(response);
      toast.success("Booking successful!");
      onRequestClose();
      setTimeout(async () => {
        resetEvents(); 
        await refreshData(courtId); 
      }, 10); 
      setName('');
      setPhone(''); 
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred during booking");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Modal open={isOpen} onClose={!loading ? onRequestClose : null} aria-labelledby="booking-modal-title" aria-describedby="booking-modal-description">
      <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 1, maxWidth: 500, mx: 'auto', mt: 10, position: 'relative' }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Typography id="booking-modal-title" variant="h6" component="h2" className="!mb-4">
          Nhập thông tin người đặt
        </Typography>
        <TextField
          label="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          className="!mb-4"
        />
        <TextField
          label="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          className="!mb-4"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            onClick={handleConfirmBooking}
            variant="contained"
            color="primary"
            disabled={loading} 
          >
            Xác nhận
          </Button>
          <Button
            onClick={onRequestClose}
            variant="outlined"
            color="primary"
            disabled={loading} 
          >
            Đóng
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmBookingModal;

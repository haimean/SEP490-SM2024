import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { format, parse, isValid } from 'date-fns';

const EventModal = ({ isOpen, onClose, eventData, setEventData, isNewEvent, onSave, onDelete }) => {
  const [saveDisabled, setSaveDisabled] = useState(!isNewEvent);
  const [deleteDisabled, setDeleteDisabled] = useState(false);
  const [isPastEvent, setIsPastEvent] = useState(false);
  const [fieldsDisabled, setFieldsDisabled] = useState(!isNewEvent);

  useEffect(() => {
    setSaveDisabled(!isNewEvent);
    setDeleteDisabled(isNewEvent);
    setFieldsDisabled(!isNewEvent);
    checkIfPastEvent();
  }, [isNewEvent]);

  const checkIfPastEvent = () => {
    const now = new Date();
    const start = new Date(eventData.start);
    setIsPastEvent(start < now);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleDateChange = (field, value) => {
    const date = parse(value, "yyyy-MM-dd", new Date());
    if (isValid(date)) {
      const newStart = parse(`${value}T${format(new Date(eventData.start), "HH:mm")}`, "yyyy-MM-dd'T'HH:mm", new Date());
      const newEnd = parse(`${value}T${format(new Date(eventData.end), "HH:mm")}`, "yyyy-MM-dd'T'HH:mm", new Date());
      setEventData({ ...eventData, start: newStart.toISOString(), end: newEnd.toISOString(), date: value });
    } else {
      setEventData({ ...eventData, [field]: value });
    }
    setSaveDisabled(false);
  };

  const handleTimeChange = (field, value) => {
    const datePart = format(new Date(eventData.start), "yyyy-MM-dd");
    const newTime = parse(`${datePart}T${value}`, "yyyy-MM-dd'T'HH:mm", new Date());
    setEventData({ ...eventData, [field]: newTime.toISOString() });
    setSaveDisabled(false);
  };

  const formatDate = (date) => {
    return isValid(new Date(date)) ? format(new Date(date), "yyyy-MM-dd") : '';
  };

  const formatTime = (date) => {
    return isValid(new Date(date)) ? format(new Date(date), "HH:mm") : '';
  };

  const validateTime = () => {
    const now = new Date();
    const start = new Date(eventData.start);
    if (isNewEvent && start < now) {
      alert("Không thể chọn khoảng thời gian đã trôi qua.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateTime()) {
      onSave();
    }
  };

  let date = formatDate(eventData.start);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography variant="h6" component="h2">
          {isNewEvent ? 'Thêm Ca đặt mới' : 'Chi tiết ca đặt'}
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Tên người đặt"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          disabled={fieldsDisabled}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Số điện thoại"
          name="numberPhone"
          value={eventData.numberPhone}
          onChange={handleChange}
          disabled={fieldsDisabled}
        />
        <TextField
          label="Ngày"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => handleDateChange('date', e.target.value)}
          disabled={fieldsDisabled || isPastEvent}
          className='!mt-2'
        />
        <TextField
          label="Giờ bắt đầu"
          type="time"
          fullWidth
          value={formatTime(eventData.start)}
          onChange={(e) => handleTimeChange('start', e.target.value)}
          disabled={fieldsDisabled || isPastEvent}
          className='!mt-4'
        />
        <TextField
          label="Giờ kết thúc"
          type="time"
          fullWidth
          value={formatTime(eventData.end)}
          onChange={(e) => handleTimeChange('end', e.target.value)}
          disabled={fieldsDisabled || isPastEvent}
          className='!mt-4'
        />
        <TextField
          margin="normal"
          fullWidth
          label="Giá"
          name="price"
          value={eventData.price}
          onChange={handleChange}
          disabled={fieldsDisabled}
        />
        <Box sx={{ mt: 2 }}>
          {isNewEvent && (
            <Button variant="contained" color="primary" onClick={handleSave} disabled={saveDisabled}>
              Lưu
            </Button>
          )}
          {!isNewEvent && (
            <Button variant="contained" color="secondary" onClick={onDelete} sx={{ ml: 2 }}>
              Hủy ca đặt
            </Button>
          )}
          <Button variant="outlined" onClick={onClose} sx={{ ml: 2 }}>
            {isNewEvent ? 'Hủy' : 'Đóng'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EventModal;

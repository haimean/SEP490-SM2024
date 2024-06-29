import React, { useState } from 'react';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const EventModal = ({ isOpen, onRequestClose, onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [day, setDay] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(1);

  const handleSubmit = () => {
    onAddEvent(title, day, start, end);
    onRequestClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md p-4 mx-auto mt-20">
        <h2 id="event-modal-title" className="text-lg font-bold mb-4">Add Event</h2>
        <TextField
          type="text"
          label="Event Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Day</InputLabel>
          <Select
            value={day}
            onChange={(e) => setDay(parseInt(e.target.value))}
            label="Day"
            variant="outlined"
          >
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
              <MenuItem key={index} value={index}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type="number"
          label="Start Hour"
          variant="outlined"
          value={start}
          onChange={(e) => setStart(parseInt(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          label="End Hour"
          variant="outlined"
          value={end}
          onChange={(e) => setEnd(parseInt(e.target.value))}
          fullWidth
          margin="normal"
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Event
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;

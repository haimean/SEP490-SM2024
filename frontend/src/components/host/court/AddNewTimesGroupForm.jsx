import React from 'react';
import { Box, TextField, Button, FormControl } from '@mui/material';

const AddNewTimesGroupForm = ({ newTimesGroup, setNewTimesGroup, handleAddNewTimesGroup, setShowNewTimesForm }) => {
  return (
    <Box sx={{ my: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControl sx={{ mr: 2 }}>
          <TextField
            type="time"
            name="start"
            label="Giờ bắt đầu"
            InputLabelProps={{ shrink: true }}
            value={newTimesGroup.start}
            onChange={(e) => setNewTimesGroup({ ...newTimesGroup, start: e.target.value })}
          />
        </FormControl>
        <FormControl sx={{ mr: 2 }}>
          <TextField
            type="time"
            name="end"
            label="Giờ kết thúc"
            InputLabelProps={{ shrink: true }}
            value={newTimesGroup.end}
            onChange={(e) => setNewTimesGroup({ ...newTimesGroup, end: e.target.value })}
          />
        </FormControl>
        <FormControl sx={{ mr: 2 }}>
          <TextField
            type="number"
            name="price"
            label="Giá"
            InputLabelProps={{ shrink: true }}
            value={newTimesGroup.price}
            onChange={(e) => setNewTimesGroup({ ...newTimesGroup, price: e.target.value })}
          />
        </FormControl>
        <FormControl sx={{ mr: 2 }}>
          <TextField
            type="number"
            name="times"
            label="Số lần"
            InputLabelProps={{ shrink: true }}
            value={newTimesGroup.times}
            onChange={(e) => setNewTimesGroup({ ...newTimesGroup, times: e.target.value })}
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddNewTimesGroup}>
          Thêm
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setShowNewTimesForm(false)} sx={{ ml: 2 }}>
          Hủy
        </Button>
      </Box>
    </Box>
  );
};

export default AddNewTimesGroupForm;

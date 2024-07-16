import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Checkbox, FormControlLabel, TextField, MenuItem } from '@mui/material';

const BookingRightCP = ({ date, setDate, startHour, setStartHour, handleOpenBook, handleCheckAvailability, otherInfo, setOtherInfo, handleSubmit }) => {
  const [isRecruiting, setIsRecruiting] = useState(false);
  const [numPeople, setNumPeople] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [price, setPrice] = useState('');  // Thêm state cho giá

  const handleRecruitingChange = (event) => {
    setIsRecruiting(event.target.checked);
  };

  const checkAvailabilityAndSetPrice = () => {
    handleCheckAvailability();
    setPrice('100.000 VND');  // Giả định rằng giá sau khi kiểm tra là 100.000 VND
  };

  return (
    <Card className='mt-20'>
      <CardContent>
        <Typography variant="h6">Form đặt sân</Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <label className="block text-gray-700">
              Ngày đặt (*):
            </label>
            <div className="flex space-x-2 gap-5">
              <input
                type="date"
                className="mt-1 w-1/2 block  p-2 border border-gray-300 rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button
                type="button"
                className="mt-1 bg-green-500 text-white p-2 rounded"
                onClick={handleOpenBook}
              >
                Xem khung giờ trống
              </button>
            </div>
          </Box>
          <Box mt={2}>
            <div className="flex space-x-2 gap-4">
              <div>
                <label className="block text-gray-700">
                  Từ (*):
                </label>
                <input
                  type="time"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Đến (*):
                </label>
                <input
                  type="time"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="mt-1 bg-green-500 text-white p-2 rounded"
                  onClick={checkAvailabilityAndSetPrice}
                >
                  Kiểm tra
                </button>
              </div>
            </div>
          </Box>
          <Box mt={2}>
            <label className="block text-gray-700">
              Giá thuê:
            </label>
            {price != '' && (<Typography variant="body1" className="w-fit mt-1 p-2 border border-gray-300 rounded">
              {price}
            </Typography>)}
          </Box>
          <Box mt={2}>
            <label className="block text-gray-700">
              Lặp lại: (Lặp lại trong 1 tháng tiếp theo)
            </label>
            <select className="mt-1 block p-2 border border-gray-300 rounded">
              <option>
                Không lặp lại
              </option>
              <option>
                Hàng tuần
              </option>
              <option>
                Hàng ngày
              </option>
            </select>
          </Box>
          <Box mt={2}>
            <FormControlLabel
              control={<Checkbox checked={isRecruiting} onChange={handleRecruitingChange} />}
              label="Tuyển thêm người"
            />
          </Box>
          {isRecruiting && (
            <Box mt={2}>
              <TextField
                label="Số người cần tuyển"
                type="number"
                fullWidth
                value={numPeople}
                onChange={(e) => setNumPeople(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Trình độ"
                select
                fullWidth
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="Yếu">Yếu</MenuItem>
                <MenuItem value="Trung bình">Trung bình</MenuItem>
                <MenuItem value="Khá">Khá</MenuItem>
                <MenuItem value="Giỏi">Giỏi</MenuItem>
              </TextField>
              <Box mt={2}>
                <label className="block text-gray-700">
                  Mô tả thêm:
                </label>
                <textarea
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={otherInfo}
                  onChange={(e) => setOtherInfo(e.target.value)}
                />
              </Box>
            </Box>
          )}
          <Box mt={2} display="flex" justifyContent="flex-end">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Đặt sân
            </button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingRightCP;

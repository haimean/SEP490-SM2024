import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import {
  LocationOn,
} from "@mui/icons-material";

const BookingLeftCP = ({ map }) => {
  // Bạn có thể thêm mã để hiển thị thông tin sân và bản đồ ở đây

  return (
    <Card className='mt-20'>
      <CardContent>
        <Typography variant="h6">Thông tin sân và bản đồ</Typography>
        <Typography variant="body1" gutterBottom>Sân 1</Typography>
        <Typography variant="body2" gutterBottom>Tên nhà thi đấu: Sân vận động Mỹ Đình, Hà Nội</Typography>
        <Typography variant="body2">Địa chỉ: Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội</Typography>
        <Typography variant="body1" className='mt-5'>Bản đồ</Typography>
        <Box
          sx={{
            height: "400px",
            width: "auto",
            backgroundColor: "#f0f0f0",
          }}
        >
          {map}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookingLeftCP;

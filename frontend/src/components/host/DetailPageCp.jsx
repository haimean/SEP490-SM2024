import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import {
  LocationOn,
  CalendarToday,
  Repeat,
  Group,
  School,
  AttachMoney,
  SportsBasketball,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import RightSectionDetailPage from "./RightSectionDetailPage";

const fakeData = {
  title: "TUYỂN CỐ ĐỊNH - GIAO LƯU",
  image: "https://example.com/badminton-image.jpg",
  location:
    "US Badminton Phan Bá Vành - Số 99, ngõ 2 Phan Bá Vành, P. Cầu Diễn, Q. Nam Từ Liêm, Hà Nội",
  date: "17/05/2024, 05:30 - 05:30",
  description:
    "Team gồm đầy đủ Top thế giới \n(Axelsen Mỹ Đình, Axelsen gốc 11, Momota Hà Lội, Chiến thần Park Tu Liem, Bác sĩ tâm lý, Kẻ săn đầu GL, Vua người lùn, Nàng công chúa ngủ trên sân cầu...) \nHân hạnh đón chào ace",
  frequency: "Lặp lại hàng tuần (T3, T5, T7)",
  participants: "Cần tuyển: 2 người (Nam/Nữ)",
  level: "Trình độ: TB- đến TB+",
  price: "Giá thuê: 45,000 (nữ) - 55,000 (nam)",
  author: {
    name: "Nguyễn Duy Hữu Nghĩa",
    avatar: "https://example.com/avatar.jpg",
  },
};

const DetailPageCp = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            className={"object-cover bg-blue-200 h-96"}
            image={fakeData.image}
            alt="Badminton players"
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {fakeData.title}
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOn color="action" />
              <Typography variant="body2" ml={1}>
                {fakeData.location}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <CalendarToday color="action" />
              <Typography variant="body2" ml={1}>
                {fakeData.date}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Repeat color="action" />
              <Typography variant="body2" ml={1}>
                {fakeData.frequency}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Group color="action" />
              <Typography variant="body2" ml={1}>
                {fakeData.participants}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <School color="action" />
              <Typography variant="body2" ml={1}>
                {fakeData.level}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <AttachMoney color="action" />
              <Typography variant="body2" ml={1}>
                {fakeData.price}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Mô tả thêm
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <SportsBasketball color="action" />
              <Typography variant="body2" ml={1}>
                {fakeData.description}
              </Typography>
            </Box>

            <Typography variant="body2">{fakeData.description}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Bản đồ</Typography>
              <Button variant="outlined" startIcon={<LocationOn />}>
                Xem vị trí
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {fakeData.location}
            </Typography>
            <Box
              sx={{
                height: "400px",
                width: "100%",
                backgroundColor: "#f0f0f0",
              }}
            >
              {/* Thay thế typography bằng component google map ở đây */}
              <Typography
                variant="body2"
                sx={{ textAlign: "center", paddingTop: "180px" }}
              >
                Google Maps ở đây
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* đoạn grid này có thể để thông tin thanh toán nếu là court */}
      <RightSectionDetailPage />
    </Grid>
  );
};

export default DetailPageCp;

import React from "react";
import Navbar from "../../../layouts/player/Navbar";
import Footer from "../../../layouts/player/Footer";
import ListPageCp from "../../../components/host/ListPageCp";
import { Box, Grid, Typography } from "@mui/material";

const ListBranch = () => {
  const branchData = [
    {
      court: "Sân vận động Mỹ Đình",
      location: "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội",
      time: "19:00, 15/07/2024",
      image: "/path/to/my-dinh-image.jpg",
    },
    {
      court: "Sân vận động Thống Nhất",
      location: "138 Đặng Văn Ngữ, Phường 14, Phú Nhuận, TP.HCM",
      time: "18:30, 20/07/2024",
      image: "/path/to/thong-nhat-image.jpg",
    },
    {
      court: "Sân vận động Cẩm Phả",
      location: "138 Đặng Văn Ngữ, Phường Cẩm Phả, Cẩm Phả, Quảng Ninh",
      time: "19:30, 25/07/2024",
      image: "/path/to/cam-pha-image.jpg",
    },
    {
      court: "Sân vận động Mỹ Đình",
      location: "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội",
      time: "19:00, 15/07/2024",
      image: "/path/to/my-dinh-image.jpg",
    },
    {
      court: "Sân vận động Thống Nhất",
      location: "138 Đặng Văn Ngữ, Phường 14, Phú Nhuận, TP.HCM",
      time: "18:30, 20/07/2024",
      image: "/path/to/thong-nhat-image.jpg",
    },
    {
      court: "Sân vận động Cẩm Phả",
      location: "138 Đặng Văn Ngữ, Phường Cẩm Phả, Cẩm Phả, Quảng Ninh",
      time: "19:30, 25/07/2024",
      image: "/path/to/cam-pha-image.jpg",
    },
    {
      court: "Sân vận động Mỹ Đình",
      location: "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội",
      time: "19:00, 15/07/2024",
      image: "/path/to/my-dinh-image.jpg",
    },
    {
      court: "Sân vận động Thống Nhất",
      location: "138 Đặng Văn Ngữ, Phường 14, Phú Nhuận, TP.HCM",
      time: "18:30, 20/07/2024",
      image: "/path/to/thong-nhat-image.jpg",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar sx={{ flexShrink: 0 }} />
      <Box
        sx={{
          my: 16,
          mx: 10,
          flexGrow: 1,
          height: "full",
        }}
      >
        <Typography variant="h4" component="h2" mb={6} fontWeight={600}>
          Danh sách chi nhánh
        </Typography>
        <Grid container spacing={3}>
          {branchData.map((item, index) => (
            <Grid item xs={12} sm={4} md={3} key={index}>
              <ListPageCp {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
};

export default ListBranch;

import React from "react";
import Navbar from "../../../layouts/player/Navbar";
import Footer from "../../../layouts/player/Footer";
import CardComponent from "../../../components/host/CardComponent";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import FilterCp from "../../../components/host/FilterCp";

const ListBranch = () => {
  const branchData = [
    {
      id: 1,
      court: "Sân vận động Mỹ Đình",
      location: "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội",
      time: "19:00, 15/07/2024",
      image: "/path/to/my-dinh-image.jpg",
    },
    {
      id: 2,
      court: "Sân vận động Thống Nhất",
      location: "138 Đặng Văn Ngữ, Phường 14, Phú Nhuận, TP.HCM",
      time: "18:30, 20/07/2024",
      image: "/path/to/thong-nhat-image.jpg",
    },
    {
      id: 3,
      court: "Sân vận động Cẩm Phả",
      location: "138 Đặng Văn Ngữ, Phường Cẩm Phả, Cẩm Phả, Quảng Ninh",
      time: "19:30, 25/07/2024",
      image: "/path/to/cam-pha-image.jpg",
    },
    {
      id: 4,
      court: "Sân vận động Mỹ Đình",
      location: "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội",
      time: "19:00, 15/07/2024",
      image: "/path/to/my-dinh-image.jpg",
    },
    {
      id: 5,
      court: "Sân vận động Thống Nhất",
      location: "138 Đặng Văn Ngữ, Phường 14, Phú Nhuận, TP.HCM",
      time: "18:30, 20/07/2024",
      image: "/path/to/thong-nhat-image.jpg",
    },
    {
      id: 6,
      court: "Sân vận động Cẩm Phả",
      location: "138 Đặng Văn Ngữ, Phường Cẩm Phả, Cẩm Phả, Quảng Ninh",
      time: "19:30, 25/07/2024",
      image: "/path/to/cam-pha-image.jpg",
    },
    {
      id: 7,
      court: "Sân vận động Mỹ Đình",
      location: "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội",
      time: "19:00, 15/07/2024",
      image: "/path/to/my-dinh-image.jpg",
    },
    {
      id: 8,
      court: "Sân vận động Thống Nhất",
      location: "138 Đặng Văn Ngữ, Phường 14, Phú Nhuận, TP.HCM",
      time: "18:30, 20/07/2024",
      image: "/path/to/thong-nhat-image.jpg",
    },
  ];

  const filters = [
    {
      name: "area",
      label: "Khu vực",
      options: [
        { value: "cau giay", label: "Cầu Giấy" },
        { value: "thanh xuan", label: "Thanh Xuân" },
        { value: "hai ba trung", label: "Hai Bà Trưng" },
      ],
      onChange: (value) => handleFilterChange("distance", value),
    },
    {
      name: "time",
      label: "Thời gian",
      options: [
        { value: "latest", label: "Mới nhất" },
        { value: "oldest", label: "Cũ nhất" },
      ],
      onChange: (value) => handleFilterChange("level", value),
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
        <FilterCp filters={filters}/>
        <Grid container spacing={3}>
          {branchData.map((item) => (
            <Grid item xs={12} sm={4} md={3} key={item.id}>
              <Link to={`/host/branch/${item.id}`}>
                <CardComponent {...item} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
};

export default ListBranch;

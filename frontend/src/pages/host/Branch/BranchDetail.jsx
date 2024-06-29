import { Box } from "@mui/material";
import React from "react";
import Navbar from "../../../layouts/player/Navbar";
import Footer from "../../../layouts/player/Footer";
import DetailPageCp from "../../../components/host/DetailPageCp";
import RightSectionDetailPage from "../../../components/host/RightSectionDetailPage";

const BranchDetail = () => {
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
  };

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
          my: 12,
          mx: 10,
          flexGrow: 1,
        }}
      >
        <DetailPageCp
          title={fakeData.title}
          image={fakeData.image}
          location={fakeData.location}
          date={fakeData.date}
          description={fakeData.description}
          frequency={fakeData.frequency}
          participants={fakeData.participants}
          level={fakeData.level}
          price={fakeData.price}
          RightSectionComponent={RightSectionDetailPage}
        />
      </Box>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
};

export default BranchDetail;

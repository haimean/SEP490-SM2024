import { Box } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Navbar from "../../../layouts/player/Navbar";
import Footer from "../../../layouts/player/Footer";
import testImg from "D:/1_2024-05-SEM9/DOAN/scl.jpg"
import UserBranchDetail from "../../../components/user/Branch/UserBranchDetail";
import { useParams } from "react-router-dom";

const BranDetailUser = () => {
  const { id } = useParams();
  const fakeData = {
    title: "Sân vận động Mỹ Đình",
    image: testImg,
    location:
      "US Badminton Phan Bá Vành - Số 99, ngõ 2 Phan Bá Vành, P. Cầu Diễn, Q. Nam Từ Liêm, Hà Nội",
    date: "17/05/2024, 05:30 - 05:30",
    description:
      "Cơ sở có 3 sân! Chọn sân bên dưới các thượng đế!",
    frequency: "Lặp lại hàng tuần (T3, T5, T7)",
    participants: "Cần tuyển: 2 người (Nam/Nữ)",
    level: "Trình độ: TB- đến TB+",
    price: "Giá thuê: 45,000 (nữ) - 55,000 (nam)",
  };
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const storedUserRole = localStorage.getItem("userRole");
    // Nếu có dữ liệu, cập nhật state
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []); // Mảng dependencies rỗng để chỉ chạy khi component được mount

  const map = (
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0729529435525!2d105.76647617503149!3d21.02976678061981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454baed2a775d%3A0x47abd3d09006674b!2zxJAuIEzDqiDEkOG7qWMgVGjhu40sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1720488012916!5m2!1svi!2s"
      width="100%"
      height="200"
      style={{ border: 0 }} allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade">
    </iframe>
  );

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
        <UserBranchDetail
          title={fakeData.title}
          image={fakeData.image}
          description={fakeData.description}
          map={map}
        />
      </Box>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
};

export default BranDetailUser;

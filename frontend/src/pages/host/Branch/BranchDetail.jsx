import { Box } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Navbar from "../../../layouts/player/Navbar";
import Footer from "../../../layouts/player/Footer";
import DetailPageCp from "../../../components/host/DetailPageCp";
import { useParams } from "react-router-dom";

const BranchDetail = () => {
  const { id } = useParams();
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
  const [userRole, setUserRole] = useState("");
  console.log("🚀 ========= userRole:", userRole);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const storedUserRole = localStorage.getItem("userRole");
    // Nếu có dữ liệu, cập nhật state
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []); // Mảng dependencies rỗng để chỉ chạy khi component được mount
  const map = (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238341.61060617006!2d105.53860539453123!3d21.029177999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4caf655555%3A0x4debb020d93041f0!2sFpt%20Software!5e0!3m2!1svi!2s!4v1719668441308!5m2!1svi!2s"
      width={1000}
      height={450}
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
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
          id={id}
          role={userRole}
          map={map}
          type={"Branch"}
        />
      </Box>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
};

export default BranchDetail;

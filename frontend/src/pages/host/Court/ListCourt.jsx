// src/components/ListCourt.js
import React from "react";
import CourtDetailList from "../../../components/host/court/CourtDetailList";
import Navbar from "../../../layouts/player/Navbar";
import Footer from "../../../layouts/player/Footer";

const activities = [
  {
    image: "path/to/image1.jpg",
    price: "60,000 - 70,000",
    title: "Sân Hoàng Mai",
    description: "Đang xác định vị trí của bạn",
    location: "Sân Đức Thảo, P. Mai Động, Q. Hoàng Mai, Hà Nội",
    date: "Thứ 7, 29/06/2024, 18:00 - 20:00",
    schedule: "T2, T3, T4, T5, T6, T7, CN",
    level: "Trình độ: TBY đến TB",
  },
  {
    image: "path/to/image2.jpg",
    price: "50,000 - 70,000",
    title: "Sân Hồ Tây",
    description: "Đang xác định vị trí của bạn",
    location: "Sân THPT Phạm Hồng Thái, P. Cống Vị, Q. Ba Đình, Hà Nội",
    date: "Thứ 7, 29/06/2024, 17:45 - 19:45",
    schedule: "T3, T5, T7",
    level: "Trình độ: TB đến TB+",
  },
  // Add more activities as needed
];

const ListCourt = () => {
  return (
    <>
      <Navbar sx={{ flexShrink: 0 }} />
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">
            Tìm thấy {activities.length} hoạt động
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((activity, index) => (
              <CourtDetailList key={index} activity={activity} />
            ))}
          </div>
        </div>
        <Footer sx={{ flexShrink: 0 }} />
      </div>
    </>
  );
};

export default ListCourt;

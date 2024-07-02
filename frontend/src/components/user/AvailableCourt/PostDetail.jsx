// pages/PostDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Stack } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

const PostDetail = () => {
  const { id } = useParams();
  
  const activity = {
    image: "https://via.placeholder.com/1500",
    title: "CLB FUCHAN TUYỂN NAM, NỮ GIAO LƯU",
    location: "Sân ban cơ yếu chính phủ, P. Láng Hạ, Q. Đống Đa, Hà Nội",
    date: "Thứ 4, 03/07/2024",
    time: "20:00 - 22:00",
    price: "50,000đ",
    level: "Trung bình",
    description: "Lặp lại hàng tuần (T2, T3, T4, T5, T6, T7, CN). Cần tuyển: 4 người (Nam/Nữ)"
  };

  return (
    <div className="container mx-auto p-4">
      <img src={activity.image} alt={activity.title} className="w-full h-auto mb-4" />
      <Typography component="h1" variant="h4" className="mb-4">
        {activity.title}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} className="mb-4">
        <LocationOnOutlinedIcon className="text-red-600" />
        <Typography>{activity.location}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1} className="mb-4">
        <EventIcon className="text-red-600" />
        <Typography>{activity.date}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1} className="mb-4">
        <AccessTimeIcon className="text-red-600" />
        <Typography>{activity.time}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1} className="mb-4">
        <PaidOutlinedIcon className="text-red-600" />
        <Typography>{activity.price}</Typography>
      </Stack>
      <Typography>
        Trình độ: {activity.level}
      </Typography>
      <Typography className="mt-4">
        {activity.description}
      </Typography>
    </div>
  );
};

export default PostDetail;

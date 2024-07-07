import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import PostCard from '../Post/PostCard';
import LocationFilter from './LocationFilter';

const activities = [
  {
    id: 1,
    title: "CLB FUCHAN TUYỂN NAM, NỮ GIAO LƯU",
    province: "Thành phố Hà Nội",
    district: "Quận Đống Đa",
    ward: "Phường Láng Hạ",
    location: "Sân ban cơ yếu chính phủ, P. Láng Hạ, Q. Đống Đa, Hà Nội",
    date: "2024-07-03",
    time: "20:00 - 22:00",
    price: "50000",
    level: "Trung bình",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    title: "CLB FUCHAN TUYỂN NAM, NỮ GIAO LƯU",
    province: "Thành phố Hà Nội",
    district: "Quận Đống Đa",
    ward: "Phường Láng Hạ",
    location: "Sân ban cơ yếu chính phủ, P. Láng Hạ, Q. Đống Đa, Hà Nội",
    date: "2024-07-04",
    time: "20:00 - 22:00",
    price: "70000",
    level: "Trung bình khá",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    title: "CLB FUCHAN TUYỂN NAM, NỮ GIAO LƯU",
    province: "Thành phố Hà Nội",
    district: "Quận Đống Đa",
    ward: "Phường Láng Hạ",
    location: "Sân ban cơ yếu chính phủ, P. Láng Hạ, Q. Đống Đa, Hà Nội",
    date: "2024-07-03",
    time: "20:00 - 22:00",
    price: "50000",
    level: "Khá",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 4,
    title: "CLB FUCHAN TUYỂN NAM, NỮ GIAO LƯU",
    province: "Thành phố Hà Nội",
    district: "Quận Đống Đa",
    ward: "Phường Láng Hạ",
    location: "Sân ban cơ yếu chính phủ, P. Láng Hạ, Q. Đống Đa, Hà Nội",
    date: "2024-07-03",
    time: "20:00 - 22:00",
    price: "50000",
    level: "Yếu",
    image: "https://via.placeholder.com/200",
  },
];

const AvailableCourt = () => {
  const [filters, setFilters] = useState({
    province: '',
    district: '',
    ward: '',
    date: '',
    time: '',
    level: '',
    price: '',
  });

  const handleFilterChange = (province, district, ward, date, time, level, price) => {
    setFilters({ province, district, ward, date, time, level, price });
  };

  const isTimeInRange = (timeRange, selectedTime) => {
    if (!timeRange || !selectedTime) return true;
    const [start, end] = timeRange.split(' - ');
    return selectedTime >= start && selectedTime <= end;
  };

  const filteredActivities = activities.filter((activity) => {
    if (filters.province && activity.province !== filters.province) return false;
    if (filters.district && activity.district !== filters.district) return false;
    if (filters.ward && activity.ward !== filters.ward) return false;
    if (filters.date && activity.date !== filters.date) return false;
    if (filters.time && !isTimeInRange(activity.time, filters.time)) return false;
    if (filters.level && activity.level !== filters.level) return false;
    if (filters.price && filters.price !== 'deal' && parseInt(activity.price) > parseInt(filters.price)) return false;
    if (filters.price === 'deal' && activity.price !== 'Thỏa thuận') return false;
    return true;
  });

  return (
    <Container className='my-32'>
      <LocationFilter onFilterChange={handleFilterChange} />
      <div className="text-center my-4">
        <Typography variant="h6">
          Tìm thấy <span className="text-red-500">{filteredActivities.length}</span> kết quả
        </Typography>
      </div>
      <Grid container spacing={2}>
        {filteredActivities.map((activity) => (
          <Grid item xs={12} md={6} key={activity.id}>
            <PostCard activity={activity} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AvailableCourt;

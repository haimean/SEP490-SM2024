import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import PostCard from '../Post/PostCard';
import LocationFilter from './LocationFilter';
import CallApi from '../../../service/CallAPI';
import { toast } from "react-toastify";
import { format, parseISO } from 'date-fns';

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
  const [activities, setActivities] = useState([]);

  const [filters, setFilters] = useState({
    province: '',
    district: '',
    ward: '',
    date: '',
    time: '',
    level: '',
    price: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await CallApi(
        "/api/booking/get-booking-post",
        "get",
        {},
        {}
      );
      setActivities(response.data);
      console.log(response);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleFilterChange = (province, district, ward, date, time, level, price) => {
    setFilters({ province, district, ward, date, time, level, price });
    console.log(date);
  };

  const isTimeInRange = (start, end, selectedTime) => {
    if (!start || !end || !selectedTime) return true;
    return selectedTime >= start && selectedTime <= end;
  };

  const filteredActivities = activities.filter((activity) => {
    const formattedDate = format(parseISO(activity.dateTime), 'yyyy-MM-dd');
    const formattedStartTime = format(parseISO(activity.startTime), 'HH:mm');
    const formattedEndTime = format(parseISO(activity.endTime), 'HH:mm');
    if (filters.province && activity.Court.Branches.address.provinces !== filters.province) return false;
    if (filters.district && activity.Court.Branches.address.districts !== filters.district) return false;
    if (filters.ward && activity.Court.Branches.address.wards !== filters.ward) return false;
    if (filters.date && formattedDate !== filters.date) return false;
    if (filters.time && !isTimeInRange(formattedStartTime, formattedEndTime, filters.time)) return false;
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

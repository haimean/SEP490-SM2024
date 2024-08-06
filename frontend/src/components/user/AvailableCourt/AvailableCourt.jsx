import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import PostCard from "../Post/PostCard";
import LocationFilter from "./LocationFilter";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import haversine from "haversine";

const AvailableCourt = () => {
  const [activities, setActivities] = useState([]);
  console.log("🚀 ========= activitiesaaaaa:", activities);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendRequest, SetIsSendRequest] = useState(false);
  const [filters, setFilters] = useState({
    province: "",
    district: "",
    ward: "",
    date: "",
    time: "",
    level: "",
    price: "",
  });
  useEffect(() => {
    fetchData();
  }, [isSendRequest]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await CallApi("/api/booking/get-booking-post", "get");
      console.log("🚀 ========= response:", response);
      setIsLoading(false);
      setActivities(response.data);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleFilterChange = (
    province,
    district,
    ward,
    date,
    time,
    level,
    price
  ) => {
    setFilters({ province, district, ward, date, time, level, price });
    console.log(date);
  };

  const isTimeInRange = (start, end, selectedTime) => {
    if (!start || !end || !selectedTime) return true;
    return selectedTime >= start && selectedTime <= end;
  };

  const filteredActivities = activities?.filter((activity) => {
    // const formattedDate = format(parseISO(activity.dateTime), "yyyy-MM-dd");
    const formattedStartTime = format(parseISO(activity?.startTime), "HH:mm");
    const formattedEndTime = format(parseISO(activity?.endTime), "HH:mm");
    if (
      filters.province &&
      activity?.Court.Branches?.address?.provinces !== filters.province
    )
      return false;
    if (
      filters.district &&
      activity?.Court?.Branches?.address?.districts !== filters.district
    )
      return false;
    if (
      filters.ward &&
      activity?.Court?.Branches?.address?.wards !== filters.ward
    )
      return false;
    // if (filters.date && formattedDate !== filters.date) return false;
    if (
      filters.time &&
      !isTimeInRange(formattedStartTime, formattedEndTime, filters.time)
    )
      return false;
    if (filters.level && activity.level !== filters.level) return false;
    if (
      filters.price &&
      filters.price !== "deal" &&
      parseInt(activity.price) > parseInt(filters.price)
    )
      return false;
    if (filters.price === "deal" && activity.price !== "Thỏa thuận")
      return false;
    return true;
  });

  return isLoading === true ? (
    <Box
      sx={{
        width: "100%",
        height: "100vh", // Chiều cao toàn màn hình
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        size={100}
        thickness={2.5}
      />
    </Box>
  ) : (
    <Container className="my-32">
      <LocationFilter onFilterChange={handleFilterChange} />
      <div className="text-center my-4">
        <Typography variant="h6">
          Tìm thấy{" "}
          <span className="text-red-500">{filteredActivities.length}</span> kết
          quả
        </Typography>
      </div>
      <Grid container spacing={2}>
        {filteredActivities.map((activity) => (
          <Grid item xs={12} md={6} key={activity?.id}>
            <PostCard
              activity={activity}
              isSendRequest={isSendRequest}
              SetIsSendRequest={SetIsSendRequest}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AvailableCourt;

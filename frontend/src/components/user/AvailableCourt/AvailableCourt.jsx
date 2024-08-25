import { useState, useEffect } from "react";
import { Container, Grid, Pagination, Typography } from "@mui/material";
import PostCard from "../Post/PostCard";
import LocationFilter from "./LocationFilter";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import Loading from "../../common/Loading";

const AvailableCourt = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await CallApi("/api/booking/get-booking-post", "get");
      console.log("🚀 ========= response:", response);
      setIsLoading(false);
      const data = response.data.reverse();
      data.forEach((element) => {
        element.isInvitation = false;
      });
      setActivities(data);
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
  };

  const isTimeInRange = (start, end, selectedTime) => {
    if (!start || !end || !selectedTime) return true;
    return selectedTime >= start && selectedTime <= end;
  };

  const filteredActivities = activities?.filter((activity) => {
    const formattedDate = format(parseISO(activity?.startTime), "yyyy-MM-dd");
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
    if (filters.date && formattedDate !== filters.date) return false;
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
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (array, page_size, page_number) => {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };
  return isLoading === true ? (
    <Loading />
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
        {paginate(filteredActivities, pageSize, currentPage).map((activity) => (
          <Grid item xs={12} md={4} key={activity?.id}>
            <PostCard
              activity={activity}
              updateStatusInvitation={() => {
                setActivities((data) => {
                  return data.map((element) => {
                    if (element?.post?.id == activity?.post?.id) {
                      element.isInvitation = true;
                    }
                    return element;
                  });
                });
              }}
            />
          </Grid>
        ))}
      </Grid>
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(filteredActivities.length / pageSize)}
          variant="outlined"
          color="primary"
          page={currentPage}
          onChange={(event, index) => {
            setCurrentPage(index);
            console.log("data", index);
          }}
        />
      </div>
    </Container>
  );
};

export default AvailableCourt;

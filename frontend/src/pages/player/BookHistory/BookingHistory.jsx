import { Box, List, ListItem, Typography, Pagination } from "@mui/material";
import BookingHistoryItem from "../../../components/player/BookHistory/BookingHistoryItem";
import { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5;

  useEffect(() => {
    getBookingHistory();
  }, [page]);

  const getBookingHistory = async () => {
    try {
      const requestData = {
        pagination: {
          page: page,
          perPage: perPage,
        },
      };
      const result = await CallApi(
        `/api/user/booking/get-all-for-user`,
        "post",
        requestData
      );
      setBookings(result?.data?.response);
      console.log(result?.data?.response);

      setTotalPages(Math.max(1, Math.ceil(result?.data?.total / perPage) || 1));
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  const handleCancelSuccess = async () => {
    await getBookingHistory();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        margin: "auto",
        mt: 12,
        maxWidth: {
          sm: "540px",
          md: "720px",
          xl: "1000px",
        },
        minWidth: {
          sm: "540px",
          md: "720px",
          xl: "1000px",
        },
      }}
    >
      <Typography variant="h5" gutterBottom>
        Lịch sử đặt sân
      </Typography>
      <List>
        {bookings.map((booking) => (
          <ListItem key={booking?.id} disablePadding>
            <BookingHistoryItem
              bookings={booking}
              onCancelSuccess={handleCancelSuccess}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default BookingHistory;

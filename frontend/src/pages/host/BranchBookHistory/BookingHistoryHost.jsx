import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";

import BaseBox from "../../common/BaseBox";
import BookingHistoryItemHost from "../../../components/host/BranchBookHistory/BookingHistoryItemHost";
import CallApi from "../../../service/CallAPI";
import { useParams } from "react-router-dom";

const BookingHistoryHost = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const perPage = 5;

  useEffect(() => {
    getBookingHistory();
  }, [page, sortOrder]);

  const getBookingHistory = async () => {
    try {
      const requestData = {
        pagination: {
          page: page,
          perPage: perPage,
        },
        sort: {
          startTime: sortOrder,
        },
        branchesId: parseInt(id),
      };
      const result = await CallApi(
        "/api/host/history-booking/history",
        "post",
        requestData
      );
      setBookings(result?.data?.bookings);
      setTotalPages(Math.max(1, Math.ceil(result?.data?.total / perPage) || 1));
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  const handleCancelSuccess = (cancelledBookingId) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== cancelledBookingId)
    );
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <BaseBox title="Lịch sử đặt sân">
      <FormControl sx={{ minWidth: 120, marginBottom: 3 }}>
        <InputLabel id="sort-order-label">Ngày đặt</InputLabel>
        <Select
          labelId="sort-order-label"
          value={sortOrder}
          label="Ngày đặt"
          onChange={handleSortChange}
        >
          <MenuItem value="desc">Mới nhất</MenuItem>
          <MenuItem value="asc">Cũ nhất</MenuItem>
        </Select>
      </FormControl>
      <List>
        {bookings.map((booking) => (
          <ListItem key={booking?.id} disablePadding>
            <BookingHistoryItemHost
              bookings={booking}
              onCancelSuccess={handleCancelSuccess}
              branchId={id}
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
    </BaseBox>
  );
};

export default BookingHistoryHost;

import { Box, List, ListItem, Typography } from "@mui/material";
import BookingHistoryItem from "../../../components/player/BookHistory/BookingHistoryItem";

const BookingHistory = () => {
  // const [bookings, setBookings] = useState(/* danh sách đặt sân ban đầu */);

  // const handleCancelSuccess = (cancelledBookingId) => {
  //   // Cập nhật danh sách đặt sân bằng cách loại bỏ đặt sân đã hủy
  //   setBookings(prevBookings => prevBookings.filter(booking => booking.id !== cancelledBookingId));
  //   // Có thể thêm thông báo thành công ở đây
  // };

  const bookings = [
    {
      id: 1,
      createdAt: "2024-07-10T08:30:00Z",
      updatedAt: "2024-07-10T08:30:00Z",
      accountId: 101,
      Court: {
        id: 1,
        name: "Sân Thống Nhất A",
      },
      courtId: 1,
      dateTime: "2024-07-15T14:00:00Z",
      startTime: "2024-07-15T14:00:00Z",
      endTime: "2024-07-15T16:00:00Z",
      price: 500000,
      bookingInfo: {
        id: 1,
        name: "Nguyễn Văn A",
        numberPhone: "0901234567",
      },
    },
    {
      id: 2,
      createdAt: "2024-07-11T10:15:00Z",
      updatedAt: "2024-07-11T10:15:00Z",
      accountId: 102,
      Court: {
        id: 2,
        name: "Sân Hòa Bình B",
      },
      courtId: 2,
      dateTime: "2024-06-18T18:30:00Z",
      startTime: "2024-06-18T18:30:00Z",
      endTime: "2024-06-18T20:30:00Z",
      price: 600000,
      bookingInfo: {
        id: 2,
        name: "Trần Thị B",
        numberPhone: "0912345678",
      },
    },
    {
      id: 3,
      createdAt: "2024-07-12T14:45:00Z",
      updatedAt: "2024-07-12T14:45:00Z",
      accountId: 103,
      Court: {
        id: 3,
        name: "Sân Lê Đại Hành C",
      },
      courtId: 3,
      dateTime: "2024-07-20T09:00:00Z",
      startTime: "2024-07-20T09:00:00Z",
      endTime: "2024-07-20T11:00:00Z",
      price: 450000,
      bookingInfo: {
        id: 3,
        name: "Lê Văn C",
        numberPhone: "0923456789",
      },
    },
  ];

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
          <ListItem key={booking.id} disablePadding>
            <BookingHistoryItem
              booking={booking}
              // onCancelSuccess={handleCancelSuccess}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BookingHistory;

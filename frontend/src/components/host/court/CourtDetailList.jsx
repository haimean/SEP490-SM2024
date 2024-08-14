/* eslint-disable react/prop-types */
import { Box, Button, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UpdateCourt from "../../../pages/host/Court/UpdateCourt";
import { useState } from "react";
import BookingModal from "../Booking/BookingModal";

const CourtDetailList = ({ activity, onDeleteCourt, branchId }) => {
  const [updateCourtModal, setUpdateCourtModal] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const [courtId, setCourtId] = useState(false);
  const [court, setCourt] = useState(false);
  const handleOpenModalUpdateCourt = (id) => {
    setCourtId(id);
    setUpdateCourtModal(true);
  };
  const handleCloseModalUpdateCourt = async () => {
    setUpdateCourtModal(false);
  };
  const handleOpenCalendarModal = (id, courtDetail) => {
    setCourtId(id);
    setCourt(courtDetail);
    setIsCalendarModalOpen(true);
  };

  const handleCloseCalendarModal = () => {
    setIsCalendarModalOpen(false);
  };
  return (
    <Card className="flex">
      <img
        src={activity?.Branches?.image}
        alt={activity?.name}
        className="w-[300px] h-[300px] object-cover"
      />
      <Box className="p-4 w-full">
        <Box>
          <Link to={`/branch/${branchId}/court/${activity?.id}`}>
            <Typography variant="h5" className="text-lg font-bold mb-2">
              Tên sân: {activity?.name}
            </Typography>
          </Link>
          <Typography className="flex items-center text-sm text-gray-600">
            Kiểu sân: {activity?.TypeCourt?.name}
          </Typography>
        </Box>
        <Box className="flex justify-around flex-col mt-5">
          <Button
            variant="contained"
            sx={{
              marginBottom: "1rem",
            }}
            onClick={() => handleOpenCalendarModal(activity?.id, activity)} // Open Calendar Modal
          >
            Xem lịch đặt
          </Button>
          <Button
            variant="contained"
            color="info"
            sx={{
              marginBottom: "1rem",
            }}
            onClick={() => handleOpenModalUpdateCourt(activity?.id)}
          >
            Sửa thông tin
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              marginBottom: "1rem",
            }}
            onClick={() => onDeleteCourt(activity?.id, activity?.name)}
          >
            Xóa sân
          </Button>
        </Box>
      </Box>
      {updateCourtModal && (
        <UpdateCourt
          id={courtId}
          open={updateCourtModal}
          handleClose={handleCloseModalUpdateCourt}
        />
      )}
      {isCalendarModalOpen && (
        <BookingModal
          open={isCalendarModalOpen}
          onClose={handleCloseCalendarModal}
          courtId={courtId}
          court={court}
        />
      )}
    </Card>
  );
};

export default CourtDetailList;

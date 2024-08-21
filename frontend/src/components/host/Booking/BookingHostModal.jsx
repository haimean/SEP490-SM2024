/* eslint-disable react/prop-types */

import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import CalendarModalComponent from "./CalendarModalComponent";
import CallApi from "../../../service/CallAPI";
import CloseIcon from "@mui/icons-material/Close";

const BookingHostModal = ({ open, onClose, court }) => {
  // Nhận được court
  const [courts, setCourts] = useState([]);
  const [courtId, setCourtId] = useState([]);

  // call lấy list data court của beanch
  useEffect(() => {
    setCourtId(court?.id);
    const getAllCourt = async () => {
      try {
        const result = await CallApi(
          `/api/host/court/branch/${court?.branchesId}`,
          "get"
        );
        setCourts(result?.data);
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    };
    getAllCourt();
  }, [open, onClose, court]);
  // select chọn sân, gen sân theo sân đã chọn
  const handleChange = (event) => {
    setCourtId(event.target.value);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 h-5/6 bg-white border border-gray-300 shadow-lg p-4 rounded-lg overflow-auto">
        <Box className="flex justify-between items-center ">
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Sân</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={courtId}
                label="Age"
                onChange={handleChange}
              >
                {courts.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box display="flex" alignItems="center">
              <Box width={16} height={16} bgcolor="rgb(70, 130, 180)" mr={1} />
              <Typography variant="body2" className="w-[180px]">
                Ca khách đặt trên hệ thống
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Box width={16} height={16} bgcolor="rgb(34, 139, 34)" mr={1} />
              <Typography variant="body2" className="w-[250px]">
                Ca chủ sân tự đặt trên hệ thống
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <CalendarModalComponent courtId={courtId} />
      </Box>
    </Modal>
  );
};

export default BookingHostModal;

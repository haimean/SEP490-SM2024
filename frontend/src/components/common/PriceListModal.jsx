import {
  Box,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { dateUntil } from "../../utils/date";
import { format } from "date-fns";

const PriceListModal = ({
  isOpen,
  onRequestClose,
  priceLists,
  openHour,
  closeHour,
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const sortPriceListsByTime = (list) => {
    return list.sort((a, b) => {
      const timeA =
        new Date(a.start).getHours() * 60 + new Date(a.start).getMinutes();
      const timeB =
        new Date(b.start).getHours() * 60 + new Date(b.start).getMinutes();
      return timeA - timeB;
    });
  };

  const getTimeInMinutes = (date) => {
    if (!date || !(date instanceof Date)) {
      console.error("Invalid date provided:", date);
      return 0; // Hoặc giá trị mặc định khác mà bạn thấy phù hợp
    }
    return date.getHours() * 60 + date.getMinutes();
  };

  const adjustPriceListByOpenCloseHours = (list) => {
    return list
      .map((item) => {
        const startTime = new Date(item.start);
        const endTime = new Date(item.end);

        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
          console.error("Invalid start or end time:", item);
          return null;
        }

        const startHourMinute = getTimeInMinutes(startTime);
        const endHourMinute = getTimeInMinutes(endTime);
        const openHourMinute = getTimeInMinutes(openHour);
        const closeHourMinute = getTimeInMinutes(closeHour);

        if (
          startHourMinute < openHourMinute &&
          endHourMinute > openHourMinute
        ) {
          return {
            ...item,
            start: new Date(
              startTime.setHours(openHour.getHours(), openHour.getMinutes())
            ),
          };
        }

        if (
          startHourMinute < openHourMinute &&
          endHourMinute <= openHourMinute
        ) {
          return null;
        }

        if (
          startHourMinute >= closeHourMinute &&
          endHourMinute > closeHourMinute
        ) {
          return null;
        }

        if (
          startHourMinute < closeHourMinute &&
          endHourMinute > closeHourMinute
        ) {
          return {
            ...item,
            end: new Date(
              endTime.setHours(closeHour.getHours(), closeHour.getMinutes())
            ),
          };
        }

        const adjustedStartTime =
          startHourMinute < openHourMinute
            ? new Date(
                startTime.setHours(openHour.getHours(), openHour.getMinutes())
              )
            : startTime;
        const adjustedEndTime =
          endHourMinute > closeHourMinute
            ? new Date(
                endTime.setHours(closeHour.getHours(), closeHour.getMinutes())
              )
            : endTime;

        return {
          ...item,
          start: adjustedStartTime,
          end: adjustedEndTime,
        };
      })
      .filter((item) => item && item.start < item.end);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="price-list-modal-title"
      aria-describedby="price-list-modal-description"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          pl: 6,
          borderRadius: 1,
          maxWidth: 700,
          mx: "auto",
          mt: 10,
          position: "relative",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography
          id="price-list-modal-title"
          variant="h6"
          component="h2"
          className="mb-4"
        >
          Bảng Giá
        </Typography>
        <IconButton
          onClick={onRequestClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {Object.keys(priceLists).map((times) => {
          const adjustedList = adjustPriceListByOpenCloseHours(
            priceLists[times]
          );
          const sortedList = sortPriceListsByTime(adjustedList);
          return (
            <div key={times} className="mb-4">
              <Typography variant="subtitle1" component="h3" className="mb-2">
                {times === "1"
                  ? `Giá cho ${times} ca:`
                  : `Giá khi đặt từ ${times} ca trở lên`}
              </Typography>
              <TableContainer component={Paper} className="mb-4">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell variant="h5">Bắt đầu</TableCell>
                      <TableCell>Kết thúc</TableCell>
                      <TableCell>Giá (VND)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedList.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {format(new Date(item?.start), "HH:mm")}
                        </TableCell>
                        <TableCell>
                          {format(new Date(item?.end), "HH:mm")}
                        </TableCell>
                        <TableCell>{formatPrice(item.price)}/h</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          );
        })}
      </Box>
    </Modal>
  );
};

export default PriceListModal;

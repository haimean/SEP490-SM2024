import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DialogInfo from "../../common/DialogInfo";
import dayjs from "dayjs";

const EventModal = ({
  isOpen,
  onClose,
  eventData,
  setEventData,
  isNewEvent,
  onSave,
  onDelete,
}) => {
  const [saveDisabled, setSaveDisabled] = useState(!isNewEvent);
  const [deleteDisabled, setDeleteDisabled] = useState(false);
  const [isPastEvent, setIsPastEvent] = useState(false);
  const [fieldsDisabled, setFieldsDisabled] = useState(!isNewEvent);
  const [isOpenDialogInfo, setIsOpenDialogInfo] = useState(false);
  const [titleDialog, setTitleDialog] = useState("");
  const handleCloseDialogInfo = () => {
    setIsOpenDialogInfo(false);
  };
  const handleOpenDialogInfo = (title) => {
    setTitleDialog(title);
    setIsOpenDialogInfo(true);
  };

  useEffect(() => {
    setSaveDisabled(!isNewEvent);
    setDeleteDisabled(isNewEvent);
    setFieldsDisabled(!isNewEvent);
    checkIfPastEvent();
  }, [isNewEvent]);

  const checkIfPastEvent = () => {
    const now = new Date();
    const start = new Date(eventData.start);
    setIsPastEvent(start < now);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      const numericValue = value.replace(/\D/g, "");
      setEventData({ ...eventData, [name]: numericValue });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const handleDateChange = (field, value) => {
    const date = parse(value, "yyyy-MM-dd", new Date());
    if (isValid(date)) {
      const newStart = parse(
        `${value}T${format(new Date(eventData.start), "HH:mm")}`,
        "yyyy-MM-dd'T'HH:mm",
        new Date()
      );
      const newEnd = parse(
        `${value}T${format(new Date(eventData.end), "HH:mm")}`,
        "yyyy-MM-dd'T'HH:mm",
        new Date()
      );
      setEventData({
        ...eventData,
        start: newStart.toISOString(),
        end: newEnd.toISOString(),
        date: value,
      });
    } else {
      setEventData({ ...eventData, [field]: value });
    }
    setSaveDisabled(false);
  };

  const handleTimeChange = (field, value) => {
    if (value) {
      const datePart = format(new Date(eventData.start), "yyyy-MM-dd");
      const newTime = dayjs(`${datePart}T${value.format("HH:mm")}`);
      setEventData({ ...eventData, [field]: newTime.toISOString() });
      setSaveDisabled(false);
    }
  };

  const formatDate = (date) => {
    return isValid(new Date(date)) ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  const formatTime = (date) => {
    return isValid(new Date(date)) ? dayjs(date).format("HH:mm") : "";
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  const handleSave = () => {
    onSave();
  };

  let date = formatDate(eventData.start);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {isNewEvent ? "Thêm Ca đặt mới" : "Chi tiết ca đặt"}
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Tên người đặt *"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          InputProps={{
            readOnly: fieldsDisabled,
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Số điện thoại *"
          name="numberPhone"
          value={eventData.numberPhone}
          onChange={handleChange}
          InputProps={{
            readOnly: fieldsDisabled,
          }}
        />
        <TextField
          label="Ngày"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => handleDateChange("date", e.target.value)}
          InputProps={{
            // readOnly: fieldsDisabled || isPastEvent,
            readOnly: true,
          }}
          className="!mt-2"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
          <TimePicker
            label="Giờ bắt đầu"
            value={dayjs(eventData.start)}
            onChange={(newValue) => handleTimeChange("start", newValue)}
            slotProps={{ textField: { fullWidth: true } }}
            readOnly
            className="!mt-4"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                InputProps={{
                  // readOnly: fieldsDisabled || isPastEvent,
                  readOnly: true,
                }}
              />
            )}
          />
          <TimePicker
            label="Giờ kết thúc"
            value={dayjs(eventData.end)}
            onChange={(newValue) => handleTimeChange("end", newValue)}
            slotProps={{ textField: { fullWidth: true } }}
            readOnly
            className="!mt-4"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                className="!mt-4"
                InputProps={{
                  // readOnly: fieldsDisabled || isPastEvent,
                  readOnly: true,
                }}
              />
            )}
          />
        </LocalizationProvider>
        <TextField
          margin="normal"
          fullWidth
          label="Thành tiền *"
          name="price"
          value={formatNumber(eventData.price)}
          onChange={handleChange}
          InputProps={{
            readOnly: fieldsDisabled,
          }}
        />
        <Box sx={{ mt: 2 }}>
          {isNewEvent && (
            <Button
              variant="contained"
              color="success"
              onClick={handleSave}
              disabled={saveDisabled}
            >
              Lưu
            </Button>
          )}
          {!isNewEvent && (
            <Button
              variant="contained"
              color="error"
              onClick={onDelete}
              sx={{ ml: 2 }}
            >
              Hủy ca đặt
            </Button>
          )}
          <Button variant="contained" onClick={onClose} sx={{ ml: 2 }}>
            {isNewEvent ? "Hủy" : "Đóng"}
          </Button>
        </Box>
        {isOpenDialogInfo && (
          <DialogInfo
            handleClose={handleCloseDialogInfo}
            open={isOpenDialogInfo}
            title={titleDialog}
          />
        )}
      </Box>
    </Modal>
  );
};

export default EventModal;

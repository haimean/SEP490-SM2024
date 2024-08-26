/* eslint-disable react/prop-types */

import "react-big-calendar/lib/css/react-big-calendar.css";

import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import React, { useEffect, useState } from "react";
import { format, getDay, parse, startOfWeek } from "date-fns";

import CallApi from "../../../service/CallAPI";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import DialogInfo from "../../common/DialogInfo";
import EventModal from "./EventModal";
import PriceListModal from "../../common/PriceListModal";
import enUS from "date-fns/locale/en-US";
import { toast } from "react-toastify";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const CustomHeader = ({ label }) => {
  const handleClick = (e) => {
    console.log("hello");
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div onClick={handleClick} style={{ pointerEvents: "none" }}>
      {label}
    </div>
  );
};

const formats = {
  timeGutterFormat: "HH:mm", // Time shown on the left side gutter
  eventTimeRangeFormat: ({ start, end }, culture, local) =>
    `${local.format(start, "HH:mm", culture)} - ${local.format(
      end,
      "HH:mm",
      culture
    )}`,
  dayHeaderFormat: "dddd, MMMM d", // Format for day headers
  dayRangeHeaderFormat: ({ start, end }, culture, local) =>
    `${local.format(start, "MMMM d", culture)} - ${local.format(
      end,
      "MMMM d",
      culture
    )}`,
  agendaTimeRangeFormat: ({ start, end }, culture, local) =>
    `${local.format(start, "HH:mm", culture)} - ${local.format(
      end,
      "HH:mm",
      culture
    )}`,
};

const messages = {
  allDay: "Cả ngày",
  previous: "Trước",
  next: "Sau",
  today: "Hôm nay",
  month: "Tháng",
  week: "Tuần",
  day: "Ngày",
  agenda: "Lịch trình",
  date: "Ngày",
  time: "Thời gian",
  event: "Ca đặt",
  noEventsInRange: "Không có ca đặt nào trong khoảng thời gian này.",
  showMore: (total) => `+ Xem thêm (${total})`,
};

const CalendarModalComponent = ({ courtId }) => {
  const [openHour, setOpenHour] = useState(null);
  const [closeHour, setCloseHour] = useState(null);
  const [priceLists, setPriceLists] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    start: "",
    end: "",
    price: 0,
    name: "",
    numberPhone: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOpenDialogInfo, setIsOpenDialogInfo] = useState(false);
  const [titleDialog, setTitleDialog] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchData(courtId);
    console.log();
  }, [courtId]);

  const handleCloseDialogInfo = () => {
    setIsOpenDialogInfo(false);
  };
  const handleOpenDialogInfo = (title) => {
    setTitleDialog(title);
    setIsOpenDialogInfo(true);
  };

  const handleOpenPriceModal = () => {
    setIsPriceModalOpen(true);
  };

  const handleClosePriceModal = () => {
    setIsPriceModalOpen(false);
  };

  const parseTime = (timeStr, date = new Date()) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const result = new Date(date);
    result.setHours(hours);
    result.setMinutes(minutes);
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result;
  };

  const fetchData = async (courtId) => {
    setLoading(true);
    try {
      const response = await CallApi(`/api/court/${courtId}`, "get", {}, {});
      setOpenHour(parseTime(response?.data?.Branches?.openingHours));
      setCloseHour(parseTime(response?.data?.Branches?.closingHours));
      const accountId = localStorage.getItem("accountId");
      const eventsData = response?.data?.booking
        .filter((b) => {
          const startTime = new Date(b.startTime.replace("Z", ""));
          const endTime = new Date(b.endTime.replace("Z", ""));
          const openingHour = parseTime(
            response?.data?.Branches?.openingHours,
            startTime
          );
          const closingHour = parseTime(
            response?.data?.Branches?.closingHours,
            endTime
          );
          return startTime >= openingHour && endTime <= closingHour;
        })
        .map((event) => ({
          id: event.id,
          title: `${event.bookingInfo.name} - ${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(event.price)}`,
          start: new Date(event.startTime.replace("Z", "")),
          end: new Date(event.endTime.replace("Z", "")),
          bookingInfo: event.bookingInfo,
          price: event.price,
          isOwnBooking: event.accountId == accountId,
        }));
      setEvents(eventsData);

      const priceLists = {};
      response.data.TypeCourt.priceTypeCourt.forEach((p) => {
        const priceObject = {
          // start: new Date(p.startTime.replace("Z", "")),
          // end: new Date(p.endTime.replace("Z", "")),
          start: new Date(p.startTime),
          end: new Date(p.endTime),
          price: p.price,
        };
        if (!priceLists[p.times]) {
          priceLists[p.times] = [];
        }
        priceLists[p.times].push(priceObject);
      });
      setPriceLists(priceLists);
    } catch (error) {
      toast.error(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    const timeDifference = end - start;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference >= 24) {
      return;
    }
    const isSlotOccupied = events.some(
      (event) =>
        (start >= event.start && start < event.end) ||
        (end > event.start && end <= event.end) ||
        (start < event.start && end > event.end)
    );
    if (!isSlotOccupied) {
      const price = calculatePrice(start, end, priceLists[1]);
      setEventData({ title: "", start, end, price, name: "", numberPhone: "" });
      setIsNewEvent(true);
      setIsModalOpen(true);
    } else {
      handleOpenDialogInfo(
        "Khoảng thời gian này đã được đặt. Vui lòng chọn khoảng thời gian khác."
      );
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEventData({
      title: event.title,
      start: event.start,
      end: event.end,
      price: event.price,
      name: event.bookingInfo.name,
      numberPhone: event.bookingInfo.numberPhone,
    });
    setIsNewEvent(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setEventData({
      title: "",
      start: "",
      end: "",
      price: 0,
      name: "",
      numberPhone: "",
    });
  };

  const handleSaveEvent = async () => {
    const start = new Date(eventData.start).getHours();
    const end = new Date(eventData.end).getHours();
    if (!eventData.name) {
      handleOpenDialogInfo("Tên người đặt không được để trống.");
      return;
    }
    if (!eventData.numberPhone) {
      handleOpenDialogInfo("Số điện thoại người đặt không được để trống.");
      return;
    }
    if (eventData.price == 0) {
      handleOpenDialogInfo("Giá tiền phải lớn hơn 0.");
      return;
    }
    if (start < openHour.getHours() || end > closeHour.getHours()) {
      handleOpenDialogInfo(
        "Thời gian của ca đặt phải nằm trong giờ mở cửa và đóng cửa."
      );
      return;
    }
    if (start >= end) {
      handleOpenDialogInfo(
        "Giờ bắt đầu không thể lớn hơn hoặc bằng giờ kết thúc."
      );
      return;
    }
    const isSlotOccupied = events.some((event) => {
      if (selectedEvent && areEventsEqual(event, selectedEvent)) {
        return false;
      }
      return (
        new Date(eventData.start) < new Date(event.end) &&
        new Date(eventData.end) > new Date(event.start)
      );
    });
    if (isSlotOccupied) {
      // set title = Khoảng thời gian này đã được đặt. Vui lòng chọn khoảng thời gian khác.
      // set trạng thái
      handleOpenDialogInfo(
        "Khoảng thời gian này đã được đặt. Vui lòng chọn khoảng thời gian khác."
      );
      return;
    }
    if (isNewEvent) {
      try {
        setLoading(true);
        await CallApi(
          "/api/host/history-booking/create",
          "post",
          {
            courtId,
            startTime: new Date(eventData.start),
            endTime: new Date(eventData.end),
            price: eventData.price,
            name: eventData.name,
            numberPhone: eventData.numberPhone,
          },
          {}
        );
        toast.success("Thêm ca đặt thành công");
        handleCloseModal();
        await fetchData(courtId);
      } catch (error) {
        toast.error(error.response?.data?.error);
      } finally {
        setLoading(false);
      }
    } else {
      handleCloseModal();
    }
  };

  const handleDeleteEvent = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (reasonCancell) => {
    try {
      setLoading(true);
      await CallApi(
        "/api/host/history-booking/cancel",
        "put",
        {
          reasonCancell,
          bookingId: selectedEvent.id,
        },
        {}
      );
      toast.success("Hủy ca đặt thành công");
      handleCloseModal();
      setIsDeleteModalOpen(false);
      await fetchData(courtId);
    } catch (error) {
      toast.error(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const areEventsEqual = (event1, event2) => {
    return (
      event1.title === event2.title &&
      new Date(event1.start).getTime() === new Date(event2.start).getTime() &&
      new Date(event1.end).getTime() === new Date(event2.end).getTime()
    );
  };

  // eslint-disable-next-line no-unused-vars
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.isOwnBooking
        ? "rgb(34, 139, 34)"
        : "rgb(70, 130, 180)",
      pointerEvents: "auto",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      wordWrap: "break-word",
      lineHeight: 1,
      height: "100%",
      minHeight: "1em",
    };
    return {
      style: style,
    };
  };

  const eventTooltipAccessor = (event) => {
    return `${event.bookingInfo.name} - ${
      event.bookingInfo.numberPhone
    } - ${new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(event.price)}`;
  };

  const slotPropGetter = (date) => {
    const hours = date.getHours();
    return {};
  };

  const calculatePrice = (start, end, priceListToUse) => {
    let totalPrice = 0;
    priceListToUse.forEach((priceRange) => {
      const rangeStart = new Date(start);
      rangeStart.setHours(
        priceRange.start.getHours(),
        priceRange.start.getMinutes()
      );
      const rangeEnd = new Date(start);
      rangeEnd.setHours(priceRange.end.getHours(), priceRange.end.getMinutes());

      const effectiveStart = start > rangeStart ? start : rangeStart;
      const effectiveEnd = end < rangeEnd ? end : rangeEnd;

      if (effectiveStart < effectiveEnd) {
        const duration = (effectiveEnd - effectiveStart) / (1000 * 60 * 60); // thời gian theo giờ
        totalPrice += priceRange.price * duration;
      }
    });

    totalPrice = Math.floor(totalPrice / 1000) * 1000;

    return totalPrice;
  };

  const handleEventDelete = (event, e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên
    setSelectedEvent(event);
    handleDeleteEvent();
  };

  const Event = ({ event }) => {
    return (
      <div className="flex">
        <button
          onClick={(e) => handleEventDelete(event, e)}
          style={{
            float: "left",
            background: "none",
            border: "none",
            color: "red",
            cursor: "pointer",
            marginRight: "4px",
          }}
        >
          X
        </button>
        <strong>{event.title}</strong>
      </div>
    );
  };

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {openHour && closeHour && (
        <div className="text-center">
          <Box className="flex justify-center items-center">
            <h2 className="mr-2">
              Giờ hoạt động: {format(openHour, "HH:mm")} -{" "}
              {format(closeHour, "HH:mm")}
            </h2>
            <Button
              variant="text"
              color="warning"
              onClick={handleOpenPriceModal}
            >
              Xem Bảng Giá
            </Button>
          </Box>
          <Calendar
            localizer={localizer}
            events={events}
            defaultView="week"
            views={["month", "week", "day"]}
            startAccessor="start"
            endAccessor="end"
            titleAccessor="title"
            tooltipAccessor={eventTooltipAccessor}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            style={{ height: "70vh" }}
            min={new Date(openHour)}
            max={new Date(closeHour)}
            eventPropGetter={eventStyleGetter}
            slotPropGetter={slotPropGetter}
            messages={messages}
            formats={formats}
            components={{
              week: {
                header: CustomHeader,
              },
              day: {
                header: CustomHeader,
              },
              month: {
                header: CustomHeader,
              },
              event: Event,
            }}
          />
        </div>
      )}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        eventData={eventData}
        setEventData={setEventData}
        isNewEvent={isNewEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
      <PriceListModal
        isOpen={isPriceModalOpen}
        onRequestClose={handleClosePriceModal}
        priceLists={priceLists}
        openHour={openHour}
        closeHour={closeHour}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
      />
      {isOpenDialogInfo && (
        <DialogInfo
          handleClose={handleCloseDialogInfo}
          open={isOpenDialogInfo}
          title={titleDialog}
        />
      )}
    </Box>
  );
};

export default CalendarModalComponent;

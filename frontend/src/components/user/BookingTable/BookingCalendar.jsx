import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  parse,
  startOfWeek,
  getDay,
  format,
  differenceInMinutes,
} from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";
import { toast } from "react-toastify";
import { CircularProgress, Backdrop } from "@mui/material";
import CallApi from "../../../service/CallAPI";
import PriceListModal from "../../common/PriceListModal";
import ConfirmBookingModal from "./ConfirmBookingModal";
import DialogInfo from "../../common/DialogInfo";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date()),
  getDay,
  locales,
});

const messages = {
  allDay: "Cả ngày",
  previous: "Trước",
  next: "Sau",
  today: "Hôm nay",
  month: "Tháng",
  week: "Tuần",
  day: "Ngày",
  agenda: "Chương trình",
  date: "Ngày",
  time: "Thời gian",
  event: "Ca đặt",
  noEventsInRange: "Không có ca đặt nào trong khoảng thời gian này.",
  showMore: (total) => `+ Xem thêm (${total})`,
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

const CreateEventWithNoOverlap = ({ courtId }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [booking1, setBooking1] = useState([]);
  const [priceLists, setPriceLists] = useState({});
  const [openHour, setOpenHour] = useState(null);
  const [closeHour, setCloseHour] = useState(null);

  const parseTime = (timeStr, date = new Date()) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const result = new Date(date);
    result.setHours(hours);
    result.setMinutes(minutes);
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result;
  };
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
    fetchData(courtId);
  }, [courtId]);

  const fetchData = async (id) => {
    setLoading(true);
    try {
      const response = await CallApi(`/api/court/${id}`, "get", {}, {});
      setOpenHour(parseTime(response?.data?.Branches?.openingHours));
      setCloseHour(parseTime(response?.data?.Branches?.closingHours));

      const now = new Date();
      const accountId = localStorage.getItem("accountId");
      const futureBookings = response.data.booking
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
          return (
            startTime > now &&
            startTime >= openingHour &&
            endTime <= closingHour
          );
        })
        .map((b) => ({
          start: new Date(b.startTime.replace("Z", "")),
          end: new Date(b.endTime.replace("Z", "")),
          title: `Đã đặt`,
          isBooking: true,
          isOwnBooking: b.accountId == accountId,
        }));
      setBooking1(futureBookings);

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleSelectSlot = ({ start, end }) => {
    const now = new Date();
    if (start < now) {
      handleOpenDialogInfo("Không thể chọn giờ đã qua.");
      return;
    }
    const timeDifference = end - start;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference >= 24) {
      return;
    }
    const durationInMinutes = differenceInMinutes(end, start);
    if (durationInMinutes < 60) {
      handleOpenDialogInfo("Thời lượng đặt sân phải ít nhất 1 giờ.");
      return;
    }

    const isOverlapWithBooking = booking1.some(
      (bookedEvent) => start < bookedEvent.end && end > bookedEvent.start
    );
    if (isOverlapWithBooking) {
      handleOpenDialogInfo("Không thể chọn giờ này vì đã có booking.");
      return;
    }
    const selectedCount = selectedEvents.length + 1;

    let applicablePriceList;
    Object.keys(priceLists).forEach((times) => {
      if (selectedCount >= times) {
        applicablePriceList = priceLists[times];
      }
    });
    if (!applicablePriceList) {
      applicablePriceList = priceLists[1] || [];
    }

    const newEvent = {
      start,
      end,
      title: `Giá: ${formatPrice(
        calculatePrice(start, end, applicablePriceList)
      )}`,
      price: calculatePrice(start, end, applicablePriceList),
    };

    const updatedSelectedEvents = selectedEvents.filter(
      (event) => !(start < event.end && end > event.start)
    );

    setSelectedEvents([...updatedSelectedEvents, newEvent]);

    const filteredEvents = events.filter(
      (event) => !(start < event.end && end > event.start)
    );

    let newApplicablePriceList;
    Object.keys(priceLists).forEach((times) => {
      if (selectedCount >= times) {
        newApplicablePriceList = priceLists[times];
      }
    });
    if (!newApplicablePriceList) {
      newApplicablePriceList = priceLists[1] || [];
    }

    let updatedEvents = [...filteredEvents, newEvent];
    if (selectedEvents.length + 1 >= selectedCount) {
      updatedEvents = updatedEvents.map((event) => ({
        ...event,
        price: calculatePrice(event.start, event.end, newApplicablePriceList),
        title: `Giá: ${formatPrice(
          calculatePrice(event.start, event.end, newApplicablePriceList)
        )}`,
      }));
    }

    setEvents(updatedEvents);
    setSelectedEvents(updatedEvents);
  };

  const handleEventDelete = (eventToDelete) => {
    if (eventToDelete.isBooking) {
      return; // Prevent deletion of booking events
    }
    const updatedSelectedEvents = selectedEvents.filter(
      (event) => event !== eventToDelete
    );
    setSelectedEvents(updatedSelectedEvents);

    const selectedCount = selectedEvents.length - 1;
    let applicablePriceList;
    Object.keys(priceLists).forEach((times) => {
      if (selectedCount >= times) {
        applicablePriceList = priceLists[times];
      }
    });
    if (!applicablePriceList) {
      applicablePriceList = priceLists[1] || [];
    }

    const updatedEvents = events
      .filter((event) => event !== eventToDelete)
      .map((event) => ({
        ...event,
        price: calculatePrice(event.start, event.end, applicablePriceList),
        title: `Giá: ${formatPrice(
          calculatePrice(event.start, event.end, applicablePriceList)
        )}`,
      }));
    setEvents(updatedEvents);
    setSelectedEvents(updatedEvents);
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

  const slotPropGetter = (date) => {
    const hours = date.getHours();
    // if (hours === 0) {
    //   return {
    //     style: {
    //       backgroundColor: "lightgray",
    //       pointerEvents: "none",
    //       cursor: "not-allowed",
    //     },
    //   };
    // }
    const now = new Date();
    if (date < now) {
      return {
        style: {
          backgroundColor: "lightgray",
          pointerEvents: "none",
          borderWidth: "0px",
        },
      };
    }
    return {};
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.isBooking
        ? event.isOwnBooking
          ? "rgb(34, 139, 34)"
          : "rgb(255, 99, 71)"
        : "rgb(70, 130, 180)",
      pointerEvents: event.isBooking ? "none" : "auto",
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

  const handleClearAll = () => {
    setEvents([]);
    setSelectedEvents([]);
  };

  const handleOpenPriceModal = () => {
    setIsPriceModalOpen(true);
  };

  const handleClosePriceModal = () => {
    setIsPriceModalOpen(false);
  };

  const handleOpenBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const resetEvents = () => {
    setEvents([]);
    setSelectedEvents([]);
    fetchData(courtId);
  };

  const Event = ({ event }) => {
    return (
      <div className="flex">
        {!event.isBooking && (
          <button
            onClick={() => handleEventDelete(event)}
            style={{
              float: "left",
              background: "none",
              border: "none",
              color: "red",
              cursor: "pointer",
            }}
          >
            X
          </button>
        )}
        <strong>{event.title}</strong>
      </div>
    );
  };

  return (
    <div className="">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="text-center">
        {openHour && closeHour && (
          <>
            <h2>
              Giờ hoạt động: {format(openHour, "HH:mm")} -{" "}
              {format(closeHour, "HH:mm")}
            </h2>
            <div className="text-center my-2">
              <button
                onClick={handleClearAll}
                className={`p-2 ml-2 rounded ${
                  selectedEvents.length === 0
                    ? "bg-gray-500"
                    : "bg-red-500 text-white"
                }`}
                disabled={selectedEvents.length === 0}
              >
                Hủy tất cả
              </button>
              <button
                onClick={handleOpenBookingModal}
                className={`p-2 ml-2 rounded ${
                  selectedEvents.length === 0
                    ? "bg-gray-500"
                    : "bg-blue-500 text-white"
                }`}
                disabled={selectedEvents.length === 0}
              >
                Đặt sân
              </button>
              <button
                onClick={handleOpenPriceModal}
                className="p-2 ml-2 bg-green-500 text-white rounded"
              >
                Xem Bảng Giá
              </button>
            </div>
            <div className="text-center mb-2">
              <p>Số ca đã chọn: {selectedEvents.length}</p>
            </div>
            <Calendar
              selectable
              localizer={localizer}
              events={[...events, ...booking1]}
              defaultView="week"
              views={["week", "day"]}
              onSelectSlot={handleSelectSlot}
              style={{ height: 500 }}
              className="border p-4"
              slotPropGetter={slotPropGetter}
              eventPropGetter={eventStyleGetter}
              components={{ event: Event }}
              min={openHour}
              max={closeHour}
              messages={messages}
              formats={formats}
            />
          </>
        )}
      </div>
      <PriceListModal
        isOpen={isPriceModalOpen}
        onRequestClose={handleClosePriceModal}
        priceLists={priceLists}
        openHour={openHour}
        closeHour={closeHour}
      />
      <ConfirmBookingModal
        isOpen={isBookingModalOpen}
        onRequestClose={handleCloseBookingModal}
        courtId={courtId}
        selectedEvents={selectedEvents}
        refreshData={fetchData}
        resetEvents={resetEvents}
      />

      {isOpenDialogInfo && (
        <DialogInfo
          handleClose={handleCloseDialogInfo}
          open={isOpenDialogInfo}
          title={titleDialog}
        />
      )}
    </div>
  );
};

export default CreateEventWithNoOverlap;

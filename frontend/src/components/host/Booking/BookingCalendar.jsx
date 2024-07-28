import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, getDay, format, addHours } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US';
import { Box, CircularProgress, Backdrop, Button, TextField } from '@mui/material';
import EventModal from './EventModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import CallApi from '../../../service/CallAPI';
import { toast } from 'react-toastify';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const messages = {
  allDay: 'Cả ngày',
  previous: 'Trước',
  next: 'Sau',
  today: 'Hôm nay',
  month: 'Tháng',
  week: 'Tuần',
  day: 'Ngày',
  agenda: 'Chương trình',
  date: 'Ngày',
  time: 'Thời gian',
  event: 'Sự kiện',
  noEventsInRange: 'Không có sự kiện nào trong khoảng thời gian này.',
  showMore: total => `+ Xem thêm (${total})`,
};

const CalendarModalComponent = ({ courtId }) => {
  const [openHour, setOpenHour] = useState(null);
  const [closeHour, setCloseHour] = useState(null);
  const [selectedOpenHour, setSelectedOpenHour] = useState('');
  const [selectedCloseHour, setSelectedCloseHour] = useState('');

  const [priceLists, setPriceLists] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [eventData, setEventData] = useState({ title: '', start: '', end: '', price: 0, name: '', numberPhone: '' });
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [courtId]);

  const parseTime = (timeStr, date = new Date()) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hours);
    result.setMinutes(minutes);
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await CallApi(`/api/court/${courtId}`, "get", {}, {});
      const fetchedOpenHour = parseTime(response?.data?.Branches?.openingHours);
      const fetchedCloseHour = parseTime(response?.data?.Branches?.closingHours);

      if (!openHour && !closeHour) {
        setOpenHour(fetchedOpenHour);
        setCloseHour(fetchedCloseHour);
        setSelectedOpenHour(format(fetchedOpenHour, 'HH:mm'));
        setSelectedCloseHour(format(fetchedCloseHour, 'HH:mm'));
      }

      const eventsData = response?.data?.booking
        .filter(b => {
          const startTime = new Date(b.startTime.replace('Z', ''));
          const endTime = new Date(b.endTime.replace('Z', ''));
          const openingHour = parseTime(response?.data?.Branches?.openingHours, startTime);
          const closingHour = parseTime(response?.data?.Branches?.closingHours, endTime);
          console.log(startTime, endTime, openingHour, closingHour);
          return startTime >= openingHour && endTime <= closingHour;
        })
        .map(event => ({
          id: event.id,
          title: `${event.bookingInfo.name} - ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.price)}`,
          start: new Date(event.startTime.replace('Z', '')),
          end: new Date(event.endTime.replace('Z', '')),
          bookingInfo: event.bookingInfo,
          price: event.price
        }));
      setEvents(eventsData);

      const priceLists = {};
      response.data.TypeCourt.priceTypeCourt.forEach(p => {
        const priceObject = {
          start: new Date(p.startTime.replace('Z', '')),
          end: new Date(p.endTime.replace('Z', '')),
          price: p.price
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

  const fetchEventsData = async () => {
    setLoading(true);
    try {
      const response = await CallApi(`/api/court/${courtId}`, "get", {}, {});
      const eventsData = response?.data?.booking
        .filter(b => {
          const startTime = new Date(b.startTime.replace('Z', ''));
          const endTime = new Date(b.endTime.replace('Z', ''));
          const openingHour = setHours(setMinutes(new Date(startTime), openHour.getMinutes()), openHour.getHours());
          const closingHour = setHours(setMinutes(new Date(endTime), closeHour.getMinutes()), closeHour.getHours());
          return startTime >= openingHour && endTime <= closingHour;
        })
        .map(event => ({
          id: event.id,
          title: `${event.bookingInfo.name} - ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.price)}`,
          start: new Date(event.startTime.replace('Z', '')),
          end: new Date(event.endTime.replace('Z', '')),
          bookingInfo: event.bookingInfo,
          price: event.price
        }));
      setEvents(eventsData);

    } catch (error) {
      toast.error(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    const now = new Date();
    if (start < now) {
      alert("Không thể chọn thời gian trong quá khứ.");
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
      setEventData({ title: '', start, end, price, name: '', numberPhone: '' });
      setIsNewEvent(true);
      setIsModalOpen(true);
    } else {
      alert("Khoảng thời gian này đã được đặt. Vui lòng chọn khoảng thời gian khác.");
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
      numberPhone: event.bookingInfo.numberPhone
    });
    setIsNewEvent(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setEventData({ title: '', start: '', end: '', price: 0, name: '', numberPhone: '' });
  };

  const handleSaveEvent = async () => {
    const start = new Date(eventData.start).getHours();
    const end = new Date(eventData.end).getHours();
    if (start < openHour.getHours() || end > closeHour.getHours()) {
      alert("Thời gian sự kiện phải nằm trong giờ mở cửa và đóng cửa.");
      return;
    }
    if (start >= end) {
      alert("Giờ bắt đầu không thể lớn hơn hoặc bằng giờ kết thúc.");
      return;
    }
    const isSlotOccupied = events.some((event) => {
      if (selectedEvent && areEventsEqual(event, selectedEvent)) {
        return false;
      }
      return (
        (new Date(eventData.start) < new Date(event.end) && new Date(eventData.end) > new Date(event.start))
      );
    });
    if (isSlotOccupied) {
      alert("Khoảng thời gian này đã được đặt. Vui lòng chọn khoảng thời gian khác.");
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
            startTime: addHours(new Date(eventData.start), 14),
            endTime: addHours(new Date(eventData.end), 14),
            price: eventData.price,
            name: eventData.name,
            numberPhone: eventData.numberPhone
          },
          {}
        );
        toast.success("Thêm sự kiện thành công");
        handleCloseModal();
      } catch (error) {
        toast.error(error.response?.data?.error);
      } finally {
        setLoading(false);
        fetchEventsData();
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
          bookingId: selectedEvent.id
        },
        {}
      );
      setEvents(events.filter((event) => !areEventsEqual(event, selectedEvent)));
      toast.success("Hủy sự kiện thành công");
      handleCloseModal();
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.error);
    } finally {
      setLoading(false);
      fetchEventsData();
    }
  };

  const areEventsEqual = (event1, event2) => {
    return (
      event1.title === event2.title &&
      new Date(event1.start).getTime() === new Date(event2.start).getTime() &&
      new Date(event1.end).getTime() === new Date(event2.end).getTime()
    );
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {};
    return {
      style: style,
    };
  };

  const eventTooltipAccessor = (event) => {
    return `${event.bookingInfo.name} - ${event.bookingInfo.numberPhone} - ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.price)}`;
  };

  const slotPropGetter = (date) => {
    const hours = date.getHours();
    if (hours === 0) {
      return {
        style: {
          backgroundColor: 'lightgray',
          pointerEvents: 'none',
          cursor: 'not-allowed',
        },
      };
    }
    return {};
  };

  const calculatePrice = (start, end, priceListToUse) => {
    let totalPrice = 0;
    priceListToUse.forEach(priceRange => {
      const rangeStartHour = priceRange.start.getHours();
      const rangeEndHour = priceRange.end.getHours();
      let eventStart = new Date(start);
      let eventEnd = new Date(end);
      while (eventStart < eventEnd) {
        let nextSlot = new Date(eventStart);
        nextSlot.setMinutes(eventStart.getMinutes() + 30);
        if (nextSlot > eventEnd) {
          nextSlot = eventEnd;
        }
        const eventHour = eventStart.getHours();
        if (eventHour >= rangeStartHour && eventHour < rangeEndHour) {
          const duration = Math.round((nextSlot - eventStart) / (1000 * 60 * 30)) / 2;
          totalPrice += priceRange.price * duration;
        }
        eventStart = nextSlot;
      }
    });
    return totalPrice;
  };

  const handleOpenHourChange = (event) => {
    setSelectedOpenHour(event.target.value);
  };

  const handleCloseHourChange = (event) => {
    setSelectedCloseHour(event.target.value);
  };

  const handleApplyHours = () => {
    setOpenHour(parseTime(selectedOpenHour));
    setCloseHour(parseTime(selectedCloseHour));
    fetchEventsData();
  };

  return (
    <Box>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box display="flex" gap="8px" justifyContent="center" alignItems="center" mb={2}>
        <TextField
          label="Giờ mở cửa"
          type="time"
          value={selectedOpenHour}
          onChange={handleOpenHourChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        <TextField
          label="Giờ đóng cửa"
          type="time"
          value={selectedCloseHour}
          onChange={handleCloseHourChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        <Button variant="contained" color="primary" onClick={handleApplyHours}>
          Áp dụng giờ
        </Button>
      </Box>
      {openHour && closeHour && (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          tooltipAccessor={eventTooltipAccessor}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          style={{ height: '70vh' }}
          min={new Date(openHour)}
          max={new Date(closeHour)}
          eventPropGetter={eventStyleGetter}
          slotPropGetter={slotPropGetter}
          messages={messages}
        />
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
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
      />
    </Box>
  );
};

export default CalendarModalComponent;

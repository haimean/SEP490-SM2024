import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, getDay, format, setHours, setMinutes, setSeconds, differenceInMinutes, subHours } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US';
import { Box, CircularProgress, Backdrop } from '@mui/material';
import EventModal from './EventModal';
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

const CalendarComponent = () => {
  const openHour = setSeconds(setMinutes(setHours(new Date(), 5), 0), 0);
  const closeHour = setSeconds(setMinutes(setHours(new Date(), 22), 0), 0);
  const priceList = [
    { start: 5, end: 10, price: 100000 },
    { start: 10, end: 17, price: 120000 },
    { start: 17, end: 22, price: 150000 },
  ];

  const courtId = 1;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [eventData, setEventData] = useState({ title: '', start: '', end: '', price: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(currentDate);
  }, [currentDate]);

  const fetchData = async (date) => {
    setLoading(true);
    try {
      const response = await CallApi(
        `/api/host/history-booking/get-for-week/${courtId}`,
        "post",
        {
          date: date.toISOString(),
        },
        {}
      );
      console.log(response);

      // Chuyển đổi dữ liệu nhận được từ API thành các sự kiện
      const eventsData = response.data.map(event => ({
        id: event.id,
        title: `${event.bookingInfo.name} - ${event.price} VND`,
        start: subHours(new Date(event.startTime.replace('Z', '')), 7),
        end: subHours(new Date(event.endTime.replace('Z', '')), 7),
        bookingInfo: event.bookingInfo,
      }));
      console.log(eventsData);
      // Cập nhật state `events`
      setEvents(eventsData);
    } catch (error) {
      toast.error(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const handleSelectSlot = ({ start, end }) => {
    const now = new Date();
    if (isNewEvent && start < now) {
      alert("Không thể chọn khoảng thời gian đã trôi qua.");
      return;
    }

    const isSlotOccupied = events.some(
      (event) =>
        (start >= event.start && start < event.end) ||
        (end > event.start && end <= event.end) ||
        (start < event.start && end > event.end)
    );

    if (!isSlotOccupied) {
      const price = calculatePrice(start, end, priceList);
      setEventData({ title: ``, start, end, price, name: '', numberPhone: '' });
      setIsNewEvent(true);
      setIsModalOpen(true);
    } else {
      alert("This time slot is already occupied. Please choose another time.");
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEventData(event);
    setIsNewEvent(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setEventData({ title: '', start: '', end: '', price: 0 });
  };

  const handleSaveEvent = async () => {
    const start = new Date(eventData.start).getHours();
    const end = new Date(eventData.end).getHours();
    if (start < openHour.getHours() || end > closeHour.getHours()) {
      alert("Thời gian sự kiện phải nằm trong khoảng từ 05:00 đến 22:00.");
      return;
    }

    if (start >= end) {
      alert("Giờ bắt đầu không được lớn hơn hoặc bằng giờ kết thúc.");
      return;
    }

    const isSlotOccupied = events.some((event) => {
      if (selectedEvent && areEventsEqual(event, selectedEvent)) {
        return false; // Bỏ qua sự kiện hiện tại đang được chỉnh sửa
      }
      return (
        (start >= new Date(event.start).getTime() && start < new Date(event.end).getTime()) ||
        (end > new Date(event.start).getTime() && end <= new Date(event.end).getTime()) ||
        (start < new Date(event.start).getTime() && end > new Date(event.end).getTime())
      );
    });

    if (isSlotOccupied) {
      alert("This time slot is already occupied. Please choose another time.");
      return;
    }

    if (isNewEvent) {
      try {
        const response = await CallApi(
          "/api/host/history-booking/",
          "post",
          {
            courtId,
            startTime: new Date(eventData.start).toISOString(),
            endTime: new Date(eventData.end).toISOString(),
            price: eventData.price,
            name: eventData.name,
            numberPhone: eventData.numberPhone
          },
          {}
        );
        const newEvent = {
          ...eventData,
          title: `${eventData.name} - ${eventData.price} VND`,
          start: new Date(eventData.start),
          end: new Date(eventData.end),
          isNew: true,
          bookingInfo: { name: eventData.name, numberPhone: eventData.numberPhone }
        };
        setEvents([...events, newEvent]);
        toast.success("Event added successfully");
      } catch (error) {
        toast.error(error.response?.data?.error);
      }
    } else {
      setEvents(events.map((event) =>
        areEventsEqual(event, selectedEvent) ? { ...eventData, title: `Sự kiện - ${eventData.price}`, start: new Date(eventData.start), end: new Date(eventData.end), isNew: event.isNew } : event
      ));
    }
    handleCloseModal();
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => !areEventsEqual(event, selectedEvent)));
    handleCloseModal();
  };

  const areEventsEqual = (event1, event2) => {
    return (
      event1.title === event2.title &&
      new Date(event1.start).getTime() === new Date(event2.start).getTime() &&
      new Date(event1.end).getTime() === new Date(event2.end).getTime()
    );
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.isNew ? 'rgb(70, 130, 180)' : 'rgb(34, 139, 34)';
    const style = {
      backgroundColor,
      color: 'white',
      borderRadius: '5px',
      border: 'none',
      display: 'block',
      padding: '4px',
      textAlign: 'left'
    };
    return {
      style: style,
    };
  };

  const eventTooltipAccessor = (event) => {
    return `${event.bookingInfo.name} - ${event.bookingInfo.numberPhone}`;
  };

  const slotPropGetter = (date) => {
    const hours = date.getHours();
    if (hours === 0) { // This will target the all-day slots which have a time of 0:00
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

  const calculatePrice = (start, end, priceList) => {
    let totalPrice = 0;
    let currentTime = new Date(start);

    while (currentTime < end) {
      const currentHour = currentTime.getHours();
      const priceSlot = priceList.find((slot) => currentHour >= slot.start && currentHour < slot.end);
      const nextHour = new Date(currentTime);
      nextHour.setHours(currentHour + 1);

      if (nextHour > end) {
        nextHour.setTime(end.getTime());
      }

      const duration = differenceInMinutes(nextHour, currentTime) / 60;
      totalPrice += priceSlot.price * duration;

      currentTime = nextHour;
    }

    return totalPrice;
  };

  return (
    <Box>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
        style={{ height: 500 }}
        min={new Date(openHour)}
        max={new Date(closeHour)}
        eventPropGetter={eventStyleGetter}
        slotPropGetter={slotPropGetter}
        onNavigate={handleNavigate}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        eventData={eventData}
        setEventData={setEventData}
        isNewEvent={isNewEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </Box>
  );
};

export default CalendarComponent;

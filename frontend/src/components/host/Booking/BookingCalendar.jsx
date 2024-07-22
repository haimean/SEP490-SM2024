import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { setHours, setMinutes, setSeconds, differenceInMinutes } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box } from '@mui/material';
import EventModal from './EventModal';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const openHour = setSeconds(setMinutes(setHours(new Date(), 5), 0), 0);
  const closeHour = setSeconds(setMinutes(setHours(new Date(), 22), 0), 0);
  const priceList = [
    { start: 5, end: 10, price: 100000 },
    { start: 10, end: 17, price: 120000 },
    { start: 17, end: 22, price: 150000 },
  ];

  const [events, setEvents] = useState([
    {
      title: 'Sự kiện 1 - 100000',
      start: new Date('2024-07-20T08:00:00'),
      end: new Date('2024-07-20T09:00:00'),
      isNew: false,
      price: 100000,
    },
    {
      title: 'Sự kiện 2 - 120000',
      start: new Date('2024-07-20T10:00:00'),
      end: new Date('2024-07-20T11:00:00'),
      isNew: false,
      price: 120000,
    },
    {
      title: 'Sự kiện 3 - 120000',
      start: new Date('2024-07-19T14:00:00'),
      end: new Date('2024-07-19T15:00:00'),
      isNew: false,
      price: 120000,
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [eventData, setEventData] = useState({ title: '', start: '', end: '', price: 0 });

  const handleSelectSlot = ({ start, end }) => {
    const now = new Date();
    if (isNewEvent && start < now) {
      alert("Không thể chọn khoảng thời gian đã trôi qua.");
      return;
    }
  
    const isSlotOccupied = events.some(
      event =>
        (start >= event.start && start < event.end) ||
        (end > event.start && end <= event.end) ||
        (start < event.start && end > event.end)
    );
  
    if (!isSlotOccupied) {
      const price = calculatePrice(start, end, priceList);
      setEventData({ title: `Sự kiện mới - ${price}`, start, end, price });
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

  const handleSaveEvent = () => {
    const start = new Date(eventData.start).getHours();
    const end = new Date(eventData.end).getHours();
    console.log(start, openHour);
    if (start < openHour.getHours() || end > closeHour.getHours()) {
      alert("Thời gian sự kiện phải nằm trong khoảng từ 05:00 đến 22:00.");
      return;
    }

    if (start >= end) {
      alert("Giờ bắt đầu không được lớn hơn hoặc bằng giờ kết thúc.");
      return;
    }

    const isSlotOccupied = events.some(event => {
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
      setEvents([...events, { ...eventData, title: `Sự kiện - ${eventData.price}`, start: new Date(eventData.start), end: new Date(eventData.end), isNew: true }]);
    } else {
      setEvents(events.map(event => areEventsEqual(event, selectedEvent) ? { ...eventData, title: `Sự kiện - ${eventData.price}`, start: new Date(eventData.start), end: new Date(eventData.end), isNew: event.isNew } : event));
    }
    handleCloseModal();
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter(event => !areEventsEqual(event, selectedEvent)));
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
    };
    return {
      style: style
    };
  };

  const slotPropGetter = (date) => {
    const hours = date.getHours();
    if (hours === 0) { // This will target the all-day slots which have a time of 0:00
      return {
        style: {
          backgroundColor: 'lightgray',
          pointerEvents: 'none',
          cursor: 'not-allowed'
        }
      };
    }
    return {};
  };

  const calculatePrice = (start, end, priceList) => {
    let totalPrice = 0;
    let currentTime = new Date(start);

    while (currentTime < end) {
      const currentHour = currentTime.getHours();
      const priceSlot = priceList.find(slot => currentHour >= slot.start && currentHour < slot.end);
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
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
        min={new Date(openHour)}
        max={new Date(closeHour)}
        eventPropGetter={eventStyleGetter}
        slotPropGetter={slotPropGetter}
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

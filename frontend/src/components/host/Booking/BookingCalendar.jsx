import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, getDay, format, setHours, setMinutes, setSeconds, differenceInMinutes, subHours, addHours } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US';
import { Box, CircularProgress, Backdrop } from '@mui/material';
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

const CalendarModalComponent = ({ courtId }) => {
  const openHour = setSeconds(setMinutes(setHours(new Date(), 5), 0), 0);
  const closeHour = setSeconds(setMinutes(setHours(new Date(), 22), 0), 0);

  const [priceLists, setPriceLists] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [eventData, setEventData] = useState({ title: '', start: '', end: '', price: 0, name: '', numberPhone: '' });
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchData(currentDate);
  }, [currentDate]);

  const fetchData = async (date) => {
    setLoading(true);
    try {
      const response = await CallApi(`/api/court/${courtId}`, "get", {}, {});
      const eventsData = response?.data?.booking.map(event => ({
        id: event.id,
        title: `${event.bookingInfo.name} - ${event.price} VND`,
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

  const handleSelectSlot = ({ start, end }) => {
    const now = new Date();
    if (start < now) {
      alert("Cannot select past time slots.");
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
      alert("This time slot is already occupied. Please choose another time.");
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
      alert("Event time must be between 05:00 and 22:00.");
      return;
    }
    if (start >= end) {
      alert("Start time cannot be greater than or equal to end time.");
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
      alert("This time slot is already occupied. Please choose another time.");
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
        toast.success("Event added successfully");
        handleCloseModal();
      } catch (error) {
        toast.error(error.response?.data?.error);
      } finally {
        setLoading(false);
        fetchData(currentDate);
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
      toast.success("Event canceled successfully");
      handleCloseModal();
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.error);
    } finally {
      setLoading(false);
      fetchData(currentDate);
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
    return `${event.bookingInfo.name} - ${event.bookingInfo.numberPhone} - ${event.price}`;
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
        style={{ height: '70vh' }}
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
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
      />
    </Box>
  );
};

export default CalendarModalComponent;

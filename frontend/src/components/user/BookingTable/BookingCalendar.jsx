// CreateEventWithNoOverlap.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, getDay, format, setHours, setMinutes, setSeconds, differenceInMinutes } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US';
import { toast } from 'react-toastify';
import CallApi from '../../../service/CallAPI';
import PriceListModal from './PriceListModal';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date()),
  getDay,
  locales,
});

const CreateEventWithNoOverlap = ({ courtId }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isSameTime, setIsSameTime] = useState(true);
  const [repeatDisabled, setRepeatDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const [court, setCourt] = useState(null);
  const [booking1, setBooking1] = useState([]);
  const [priceList1, setPriceList1] = useState([]);
  const [repeatPriceListWeekly1, setRepeatPriceListWeekly1] = useState([]);
  const [repeatPriceListDaily1, setRepeatPriceListDaily1] = useState([]);

  const openHour = setSeconds(setMinutes(setHours(new Date(), 5), 0), 0);
  const closeHour = setSeconds(setMinutes(setHours(new Date(), 22), 0), 0);

  useEffect(() => {
    if (selectedEvents.length > 1) {
      const firstEvent = selectedEvents[0];
      const allSame = selectedEvents.every(event =>
        event.start.getTime() === firstEvent.start.getTime() && event.end.getTime() === firstEvent.end.getTime()
      );
      setIsSameTime(allSame);
    } else {
      setIsSameTime(true);
    }
  }, [selectedEvents]);

  useEffect(() => {
    fetchData(courtId);
  }, []);

  const fetchData = async (id) => {
    try {
      const response = await CallApi(
        `/api/court/${id}`,
        "get",
        {},
        {}
      );
      setCourt(response.data);

      const now = new Date();

      const futureBookings = response.data.booking
        .filter(b => new Date(b.startTime) > now)
        .map(b => ({
          start: new Date(b.startTime.replace('Z', '')),
          end: new Date(b.endTime.replace('Z', '')),
          title: `Đã đặt`,
          isBooking: true
        }));

      setBooking1(futureBookings);

      const priceList = [];
      const repeatPriceListWeekly = [];
      const repeatPriceListDaily = [];

      response.data.TypeCourt.priceTypeCourt.forEach(p => {
        const priceObject = {
          start: new Date(p.startTime),
          end: new Date(p.endTime),
          price: p.price
        };
        if (p.times === 1) {
          priceList.push(priceObject);
        } else if (p.times === 5) {
          repeatPriceListWeekly.push(priceObject);
        } else if (p.times === 10) {
          repeatPriceListDaily.push(priceObject);
        }
      });

      setPriceList1(priceList);
      setRepeatPriceListWeekly1(repeatPriceListWeekly);
      setRepeatPriceListDaily1(repeatPriceListDaily);
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    setRepeatDisabled(false);
    const now = new Date();
    if (start < now) {
      alert("Không thể chọn giờ đã qua.");
      return;
    }

    const durationInMinutes = differenceInMinutes(end, start);
    if (durationInMinutes < 60) {
      alert("Thời lượng đặt sân phải ít nhất 1 giờ.");
      return;
    }

    const isOverlapWithBooking = booking1.some(bookedEvent => start < bookedEvent.end && end > bookedEvent.start);

    if (isOverlapWithBooking) {
      alert("Không thể chọn giờ này vì đã có booking.");
      return;
    }

    let updatedPriceList = priceList1;

    if (selectedEvents.length + 1 >= 10) {
      updatedPriceList = repeatPriceListDaily1;
    } else if (selectedEvents.length + 1 >= 5) {
      updatedPriceList = repeatPriceListWeekly1;
    }

    const newEvent = {
      start,
      end,
      title: `Price: ${calculatePrice(start, end, updatedPriceList)}`,
      price: calculatePrice(start, end, updatedPriceList)
    };

    const firstEvent = selectedEvents[0];
    if (selectedEvents.length > 0 && (newEvent.start.getTime() !== firstEvent.start.getTime() || newEvent.end.getTime() !== firstEvent.end.getTime())) {
      setIsSameTime(false);
    } else {
      setIsSameTime(true);
    }

    const updatedSelectedEvents = selectedEvents.filter(event =>
      !(start < event.end && end > event.start)
    );

    setSelectedEvents([...updatedSelectedEvents, newEvent]);

    const filteredEvents = events.filter(event =>
      !(start < event.end && end > event.start)
    );

    let newPriceList = priceList1;
    if (selectedEvents.length + 1 >= 10) {
      newPriceList = repeatPriceListDaily1;
    } else if (selectedEvents.length + 1 >= 5) {
      newPriceList = repeatPriceListWeekly1;
    }

    let updatedEvents = [...filteredEvents, newEvent];

    if (selectedEvents.length + 1 >= 5) {
      updatedEvents = updatedEvents.map(event => ({
        ...event,
        price: calculatePrice(event.start, event.end, newPriceList),
        title: `Price: ${calculatePrice(event.start, event.end, newPriceList)}`
      }));
    }

    setEvents(updatedEvents);
  };

  const handleEventDelete = (eventToDelete) => {
    if (eventToDelete.isBooking) {
      return; // Prevent deletion of booking events
    }
    const updatedSelectedEvents = selectedEvents.filter(event => event !== eventToDelete);
    setSelectedEvents(updatedSelectedEvents);

    let updatedPriceList = priceList1;

    if (updatedSelectedEvents.length >= 10) {
      updatedPriceList = repeatPriceListDaily1;
    } else if (updatedSelectedEvents.length >= 5) {
      updatedPriceList = repeatPriceListWeekly1;
    }

    const updatedEvents = events.filter(event => event !== eventToDelete).map(event => ({
      ...event,
      price: calculatePrice(event.start, event.end, updatedPriceList),
      title: `Price: ${calculatePrice(event.start, event.end, updatedPriceList)}`
    }));

    if (updatedSelectedEvents.length < 5) {
      updatedEvents.forEach(event => {
        event.price = calculatePrice(event.start, event.end, priceList1);
        event.title = `Price: ${calculatePrice(event.start, event.end, priceList1)}`;
      });
    }

    setEvents(updatedEvents);
  };

  const calculatePrice = (start, end, priceListToUse) => {
    let totalPrice = 0;

    priceListToUse.forEach(priceRange => {
      const rangeStartHour = priceRange.start.getUTCHours();
      const rangeEndHour = priceRange.end.getUTCHours();
      let eventStart = new Date(start);
      let eventEnd = new Date(end);
      while (eventStart < eventEnd) {
        let nextSlot = new Date(eventStart);
        nextSlot.setMinutes(eventStart.getMinutes() + 30);

        if (nextSlot > eventEnd) {
          nextSlot = eventEnd;
        }

        const eventHour = eventStart.getUTCHours();

        if (eventHour >= rangeStartHour && eventHour < rangeEndHour) {
          const duration = Math.round((nextSlot - eventStart) / (1000 * 60 * 30)) / 2;
          totalPrice += priceRange.price * duration;
        }

        eventStart = nextSlot;
      }
    });

    return totalPrice;
  };

  const slotPropGetter = (date) => {
    const now = new Date();
    if (date < now) {
      return {
        style: {
          backgroundColor: 'lightgray',
          pointerEvents: 'none',
          borderWidth: '0px'
        },
      };
    }
    return {};
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.isBooking ? 'gray' : 'lightblue',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
      pointerEvents: event.isBooking ? 'none' : 'auto'
    };
    return {
      style: style
    };
  };

  const handleClearAll = () => {
    setEvents([]);
    setSelectedEvents([]);
  };

  const handleBookCourt = async () => {
    const payload = selectedEvents.map(event => ({
      courtId,
      startTime: event.start.toISOString(),
      endTime: event.end.toISOString(),
      price: event.price,
      name: "minh", // Replace with actual user name
      numberPhone: "0963400923" // Replace with actual phone number
    }));
console.log(payload);
    try {
      for (const data of payload) {
        await CallApi("/api/user/booking", "post", {}, data);
      }
      toast.success("Booking successful!");
      setSelectedEvents([]);
      fetchData(courtId); // Refresh the data
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred during booking");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const Event = ({ event }) => {
    return (
      <span>
        <strong>{event.title}</strong>
        {!event.isBooking && (
          <button
            onClick={() => handleEventDelete(event)}
            style={{
              float: 'right',
              background: 'none',
              border: 'none',
              color: 'red',
              cursor: 'pointer'
            }}
          >
            X
          </button>
        )}
      </span>
    );
  };

  return (
    <div className="">
      <div className="text-center mb-4">
        <h2>Giờ hoạt động: {format(openHour, 'HH:mm')} - {format(closeHour, 'HH:mm')}</h2>
      </div>
      <div className="text-center mb-4">
        <button
          onClick={handleClearAll}
          className="p-2 ml-2 bg-red-500 text-white rounded"
        >
          Hủy tất cả
        </button>
        <button
          onClick={handleBookCourt}
          className={`p-2 ml-2 rounded ${selectedEvents.length === 0 ? 'bg-gray-500' : 'bg-blue-500 text-white'}`}
          disabled={selectedEvents.length === 0} // Disable button when no event is selected
        >
          Đặt sân
        </button>
        <button
          onClick={handleOpenModal}
          className="p-2 ml-2 bg-green-500 text-white rounded"
        >
          Xem Bảng Giá
        </button>
      </div>
      <div className="text-center mb-4">
        <p>Số lượng ca đã chọn: {selectedEvents.length}</p>
      </div>
      <Calendar
        selectable
        localizer={localizer}
        events={[...events, ...booking1]}
        defaultView="week"
        views={['week', 'day']}
        onSelectSlot={handleSelectSlot}
        style={{ height: 500 }}
        className="border p-4"
        slotPropGetter={slotPropGetter}
        eventPropGetter={eventStyleGetter}
        components={{
          event: Event
        }}
        min={openHour}
        max={closeHour}
      />
      <PriceListModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        priceList={priceList1}
        repeatPriceListWeekly={repeatPriceListWeekly1}
        repeatPriceListDaily={repeatPriceListDaily1}
      />
    </div>
  );
};

export default CreateEventWithNoOverlap;

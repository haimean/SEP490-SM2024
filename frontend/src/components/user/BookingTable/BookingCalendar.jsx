import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, getDay, format, setHours, setMinutes, setSeconds, addDays, addWeeks } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US';

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

const CreateEventWithNoOverlap = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isSameTime, setIsSameTime] = useState(true);
  const [repeatDisabled, setRepeatDisabled] = useState(false);

  const daily = 50000;
  const weekly = 100000;

  const priceList = [
    { start: new Date('2020-05-05T05:00:00.000Z'), end: new Date('2020-05-05T10:00:00.000Z'), price: 100000 },
    { start: new Date('2020-05-05T10:00:00.000Z'), end: new Date('2020-05-05T17:00:00.000Z'), price: 120000 },
    { start: new Date('2020-05-05T17:00:00.000Z'), end: new Date('2020-05-05T22:00:00.000Z'), price: 150000 }
  ];

  const repeatPriceListDaily = [{
    start: new Date('2020-05-05T00:00:00.000Z'), end: new Date('2020-05-05T23:00:00.000Z'), price: 50000
  }]

  const repeatPriceListWeekly = [{
    start: new Date('2020-05-05T00:00:00.000Z'), end: new Date('2020-05-05T23:00:00.000Z'), price: 100000
  }]

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

  const handleSelectSlot = ({ start, end }) => {
    setRepeatDisabled(false);
    const now = new Date();
    if (start < now) {
      alert("Không thể chọn giờ đã qua.");
      return;
    }

    const newEvent = { start, end, title: `Price: ${calculatePrice(start, end)}`, price: calculatePrice(start, end) };

    // Check if new selected time is the same as existing selected events
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

    setEvents([...filteredEvents, newEvent]);
  };

  const calculatePrice = (start, end) => {
    let totalPrice = 0;

    priceList.forEach(priceRange => {
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
      backgroundColor: 'lightblue',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  };

  const handleEventDelete = (eventToDelete) => {
    setEvents(events.filter(event => event !== eventToDelete));
    setSelectedEvents(selectedEvents.filter(event => event !== eventToDelete));
  };

  const handleClearAll = () => {
    setEvents([]);
    setSelectedEvents([]);
  };

  const Event = ({ event }) => {
    return (
      <span>
        <strong>{event.title}</strong>
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
      </span>
    );
  };

  const calculateRepeatPrice = (start, end, repeatPriceList) => {
    let totalPrice = 0;

    repeatPriceList.forEach(priceRange => {
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

  const repeatDaily = () => {
    const firstEvent = selectedEvents[0];
    const updatedFirstEvent = {
      ...firstEvent,
      price: daily,
      title: `Price: ${calculateRepeatPrice(firstEvent.start, firstEvent.end, repeatPriceListDaily)}`
    };

    const updatedEvents = events.map(event => event === firstEvent ? updatedFirstEvent : event);
    
    const repeatedEvents = [];
    selectedEvents.forEach(event => {
      for (let i = 1; i <= 30; i++) {
        const newStart = addDays(event.start, i);
        const newEnd = addDays(event.end, i);
        repeatedEvents.push({
          ...event,
          start: newStart,
          end: newEnd,
          price: daily,
          title: `Price: ${calculateRepeatPrice(newStart, newEnd, repeatPriceListDaily)}`
        });
      }
    });
    setEvents([...updatedEvents, ...repeatedEvents]);
    setSelectedEvents([updatedFirstEvent, ...repeatedEvents]);
    setRepeatDisabled(true);
  };

  const repeatWeekly = () => {
    const firstEvent = selectedEvents[0];
    const updatedFirstEvent = {
      ...firstEvent,
      price: weekly,
      title: `Price: ${calculateRepeatPrice(firstEvent.start, firstEvent.end, repeatPriceListWeekly)}`
    };

    const updatedEvents = events.map(event => event === firstEvent ? updatedFirstEvent : event);
    
    const repeatedEvents = [];
    selectedEvents.forEach(event => {
      for (let i = 1; i <= 4; i++) {
        const newStart = addWeeks(event.start, i);
        const newEnd = addWeeks(event.end, i);
        repeatedEvents.push({
          ...event,
          start: newStart,
          end: newEnd,
          price: weekly,
          title: `Price: ${calculateRepeatPrice(newStart, newEnd, repeatPriceListWeekly)}`
        });
      }
    });
    setEvents([...updatedEvents, ...repeatedEvents]);
    setSelectedEvents([updatedFirstEvent, ...repeatedEvents]);
    setRepeatDisabled(true);
  };

  return (
    <div className="my-32">
      <div className="text-center mb-4">
        <h2>Giờ hoạt động: {format(openHour, 'HH:mm')} - {format(closeHour, 'HH:mm')}</h2>
      </div>
      <div className="text-center mb-4">
        <button
          onClick={repeatDaily}
          className={`mr-2 p-2 rounded ${isSameTime && selectedEvents.length > 0 && !repeatDisabled ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
          disabled={!isSameTime || selectedEvents.length === 0 || repeatDisabled}
        >
          Lặp lại hàng ngày
        </button>
        <button
          onClick={repeatWeekly}
          className={`p-2 rounded ${isSameTime && selectedEvents.length > 0 && !repeatDisabled ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
          disabled={!isSameTime || selectedEvents.length === 0 || repeatDisabled}
        >
          Lặp lại hàng tuần
        </button>
        <button
          onClick={handleClearAll}
          className="p-2 ml-2 bg-red-500 text-white rounded"
        >
          Hủy tất cả
        </button>
      </div>
      <div className="text-center mb-4">
        <p>Số lượng ca đã chọn: {selectedEvents.length}</p>
      </div>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView="week"
        views={['week', 'day']}
        defaultDate={new Date()}
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
    </div>
  );
};

export default CreateEventWithNoOverlap;

import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, getDay, format, setHours, setMinutes, setSeconds, differenceInMinutes } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US';
import { toast } from 'react-toastify';
import { CircularProgress, Backdrop } from '@mui/material';
import CallApi from '../../../service/CallAPI';
import PriceListModal from './PriceListModal';
import ConfirmBookingModal from './ConfirmBookingModal';

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
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading

  const [court, setCourt] = useState(null);
  const [booking1, setBooking1] = useState([]);
  const [priceLists, setPriceLists] = useState({});
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
    setLoading(true); // Bắt đầu tải
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
      toast.error(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false); // Kết thúc tải
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
    const selectedCount = selectedEvents.length + 1;

    let applicablePriceList;

    Object.keys(priceLists).forEach(times => {
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
      title: `Price: ${calculatePrice(start, end, applicablePriceList)}`,
      price: calculatePrice(start, end, applicablePriceList)
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

    let newApplicablePriceList;

    Object.keys(priceLists).forEach(times => {
      if (selectedCount >= times) {
        newApplicablePriceList = priceLists[times];
      }
    });

    if (!newApplicablePriceList) {
      newApplicablePriceList = priceLists[1] || [];
    }

    let updatedEvents = [...filteredEvents, newEvent];

    if (selectedEvents.length + 1 >= 5) {
      updatedEvents = updatedEvents.map(event => ({
        ...event,
        price: calculatePrice(event.start, event.end, newApplicablePriceList),
        title: `Price: ${calculatePrice(event.start, event.end, newApplicablePriceList)}`
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

    const selectedCount = selectedEvents.length - 1;

    let applicablePriceList;

    Object.keys(priceLists).forEach(times => {
      if (selectedCount >= times) {
        applicablePriceList = priceLists[times];
      }
    });

    if (!applicablePriceList) {
      applicablePriceList = priceLists[1] || [];
    }

    const updatedEvents = events.filter(event => event !== eventToDelete).map(event => ({
      ...event,
      price: calculatePrice(event.start, event.end, applicablePriceList),
      title: `Price: ${calculatePrice(event.start, event.end, applicablePriceList)}`
    }));

    setEvents(updatedEvents);
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
      backgroundColor: event.isBooking ? 'rgb(255, 99, 71)' : 'rgb(70, 130, 180)',
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
      <span className='flex'>
        {!event.isBooking && (
          <button
            onClick={() => handleEventDelete(event)}
            style={{
              float: 'left',
              background: 'none',
              border: 'none',
              color: 'red',
              cursor: 'pointer'
            }}
          >
            X
          </button>
        )}
        <strong>{event.title}</strong>
      </span>
    );
  };

  return (
    <div className="">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="text-center">
        <h2>Giờ hoạt động: {format(openHour, 'HH:mm')} - {format(closeHour, 'HH:mm')}</h2>
      </div>
      <div className="text-center my-2">
        <button
          onClick={handleClearAll}
          className="p-2 ml-2 bg-red-500 text-white rounded"
        >
          Hủy tất cả
        </button>
        <button
          onClick={handleOpenBookingModal}
          className={`p-2 ml-2 rounded ${selectedEvents.length === 0 ? 'bg-gray-500' : 'bg-blue-500 text-white'}`}
          disabled={selectedEvents.length === 0} // Disable button when no event is selected
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
        isOpen={isPriceModalOpen}
        onRequestClose={handleClosePriceModal}
        priceLists={priceLists}
      />
      <ConfirmBookingModal
        isOpen={isBookingModalOpen}
        onRequestClose={handleCloseBookingModal}
        courtId={courtId}
        selectedEvents={selectedEvents}
        refreshData={fetchData}
        resetEvents={resetEvents}
      />
    </div>
  );
};

export default CreateEventWithNoOverlap;

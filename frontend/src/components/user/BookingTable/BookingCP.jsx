import React, { useState, useEffect } from 'react';
import { Button, Dialog, Box, Grid } from '@mui/material';
import { addDays, startOfWeek, format, isBefore, isSameDay, setHours } from 'date-fns';
import BookingLeftCP from './BookingLeftCP';
import BookingRightCP from './BookingRightCP';

const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  return `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`;
});

const mockRentalPrices = [
  { startHour: 0, endHour: 5, price: '100,000đ' },
  { startHour: 5, endHour: 22, price: '120,000đ' },
  { startHour: 22, endHour: 24, price: '100,000đ' }
];

const BookingTable = ({ open, onClose }) => {
  const [events, setEvents] = useState([
    { title: 'Đã đặt', date: new Date(), start: 9, end: 11 },
    { title: 'Đã đặt', date: addDays(new Date(), 1), start: 9, end: 10 },
  ]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getWeekDates = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const weekDates = getWeekDates(currentWeek);

  const prevWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7));
  };

  const nextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };

  const isPastCell = (date, hour) => {
    const cellDateTime = setHours(date, hour);
    return isBefore(cellDateTime, currentTime);
  };

  const renderEventText = (event) => {
    return 'Đã đặt';
  };

  const getRentalPriceForHour = (hour) => {
    if (hour >= 8 && hour < 22) {
      const priceEntry = mockRentalPrices.find((entry) => hour >= entry.startHour && hour < entry.endHour);
      return priceEntry ? priceEntry.price : 'Không có giá';
    } else {
      return 'Không có giá';
    }
  };

  const renderCell = (date, hour) => {
    if (hour < 8 || hour >= 22) {
      return null;
    }

    const event = events.find(
      (event) =>
        isSameDay(event.date, date) &&
        ((event.start >= hour && event.start < hour + 1) || (event.end > hour && event.end <= hour + 1) || (event.start < hour && event.end > hour))
    );

    const isPast = isPastCell(date, hour);

    let cellClass = '';
    if (event) {
      cellClass = 'bg-red-500 text-white';
    } else if (isPast) {
      cellClass = 'bg-gray-300';
    } else {
      cellClass = 'bg-white';
    }

    return (
      <td
        key={hour}
        className={`border border-gray-200 px-4 py-2 ${cellClass}`}
      >
        {event ? renderEventText(event) : isPast ? <></> : getRentalPriceForHour(hour)}
      </td>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="paper">
      <Grid container>
        <Grid item xs={6}>
          <BookingLeftCP />
        </Grid>
        <Grid item xs={6}>
          <BookingRightCP
          />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default BookingTable;

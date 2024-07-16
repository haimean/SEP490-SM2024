import React, { useState, useEffect } from 'react';
import { Button, Dialog, IconButton } from '@mui/material';
import { addDays, format, isBefore, isSameDay, setHours, getDay, isSameWeek } from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Tạo mảng giờ chỉ với các mốc giờ chẵn
const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  return `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`;
});

// Mock data for rental prices
const mockRentalPrices = [
  { startHour: 0, endHour: 5, price: '100,000đ' },
  { startHour: 5, endHour: 22, price: '120,000đ' },
  { startHour: 22, endHour: 24, price: '100,000đ' }
];

const BookingTable = ({ open, onClose }) => {
  const [events, setEvents] = useState([
    { title: 'Đã đặt', date: new Date(), start: 18, end: 20 },
    { title: 'Đã đặt', date: addDays(new Date(), 1), start: 7, end: 8 },
    { title: 'Đã đặt', date: addDays(new Date(), 2), start: 9, end: 15 },
    { title: 'Đã đặt', date: addDays(new Date(), 3), start: 12, end: 14 },
    { title: 'Đã đặt', date: addDays(new Date(), 4), start: 16, end: 18 },
    { title: 'Đã đặt', date: addDays(new Date(), 5), start: 12, end: 14 },
    { title: 'Đã đặt', date: addDays(new Date(), 6), start: 12, end: 14 },
    { title: 'Đã đặt', date: addDays(new Date(), 7), start: 12, end: 14 },
    { title: 'Đã đặt', date: addDays(new Date(), 8), start: 12, end: 14 },
    { title: 'Đã đặt', date: addDays(new Date(), 9), start: 12, end: 14 },
  ]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Cập nhật thời gian hiện tại mỗi phút

    return () => clearInterval(timer);
  }, []);

  const getWeekDates = (date) => {
    return Array.from({ length: 7 }, (_, i) => addDays(date, i));
  };

  const weekDates = getWeekDates(currentWeek);

  const isDateInCurrentWeek = (dateToCheck, referenceDate) => {
    return isSameWeek(dateToCheck, referenceDate, { weekStartsOn: 0 });
  };  

  const prevWeek = () => {
    const currentWeek1 = getDay(currentWeek);
    const plus = 7 + currentWeek1;
    if (isDateInCurrentWeek(addDays(currentWeek, -plus), new Date())) {
      setCurrentWeek(new Date());
    }else{
      setCurrentWeek(addDays(currentWeek, -plus));
    }

  };

  const nextWeek = () => {
    const currentWeek1 = getDay(currentWeek);
    const plus = 7 - currentWeek1;
    if (isDateInCurrentWeek(addDays(currentWeek, plus), new Date())) {
      setCurrentWeek(new Date());
    }else{
      setCurrentWeek(addDays(currentWeek, plus));
    }

  };

  const isPastCell = (date, hour) => {
    const cellDateTime = setHours(date, hour);
    return isBefore(cellDateTime, currentTime);
  };

  const renderEventText = (event) => {
    return (
      <>
        Đã đặt <br />
        9:15-10:15
      </>
    );
  };

  const getRentalPriceForHour = (hour) => {
    const priceEntry = mockRentalPrices.find((entry) => hour >= entry.startHour && hour < entry.endHour);
    return priceEntry ? priceEntry.price : 'Không có giá';
  };

  const renderCell = (date, hour, colIndex) => {
    const event = events.find(
      (event) =>
        isSameDay(event.date, date) &&
        ((event.start >= hour && event.start < hour + 1) || (event.end > hour && event.end <= hour + 1) || (event.start < hour && event.end > hour))
    );

    const isPast = isPastCell(date, hour);

    let cellClass = '';
    if (isPast) {
      cellClass = 'bg-gray-300';
    } else if (event) {
      cellClass = 'bg-red-500 text-white';
    } else {
      cellClass = 'bg-white';
    }

    return (
      <td
        key={`${date}-${hour}-${colIndex}`} // Sử dụng ngày, giờ và chỉ số cột để tạo khóa duy nhất
        className={`border border-gray-200 px-4 py-2 ${cellClass} w-32 text-center`}
      >
        {isPast ? <></> : event ? renderEventText(event) : getRentalPriceForHour(hour)}
      </td>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" scroll="paper">
      <div className="mb-4 flex justify-between items-center">
        <IconButton onClick={prevWeek} variant="contained" color="primary">
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={nextWeek} variant="contained" color="primary">
          <ArrowForwardIcon />
        </IconButton>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">Giờ</th>
            {weekDates.map((day, index) => {
              const isToday = isSameDay(day, currentTime);
              const headerClass = isToday ? 'bg-blue-300' : '';
              return (
                <th key={index} className={`border border-gray-200 px-4 py-2 ${headerClass}`}>
                  {daysOfWeek[getDay(day)]}
                  <br />
                  {format(weekDates[index], 'dd/MM')}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-gray-200 px-4 py-2 w-24">{hour}</td>
              {weekDates.map((date, colIndex) => renderCell(date, rowIndex, colIndex))}
            </tr>
          ))}
        </tbody>
      </table>
    </Dialog>
  );
};

export default BookingTable;

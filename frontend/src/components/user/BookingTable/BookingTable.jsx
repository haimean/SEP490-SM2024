import React, { useState, useEffect } from 'react';
import EventModal from './EventModal';
import { Button, Dialog } from '@mui/material';
import { addDays, startOfWeek, format, isBefore, isSameDay, setHours, setMinutes } from 'date-fns';

// Tạo mảng giờ với các mốc nửa giờ
const hours = Array.from({ length: 48 }, (_, i) => `${Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`);

const BookingTable = ({ open, onClose }) => {
  const [events, setEvents] = useState([
    { title: 'Đã đặt', date: new Date(), start: 9.5, end: 11 },
    { title: 'Đã đặt', date: addDays(new Date(), 1), start: 9, end: 10.5 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCells, setSelectedCells] = useState([]);

  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Cập nhật thời gian hiện tại mỗi phút

    return () => clearInterval(timer);
  }, []);

  const handleAddEvent = (title, date, start, end) => {
    setEvents([...events, { title, date, start, end }]);
    setSelectedCells([]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCellClick = (day, hour) => {
    const selectedDate = addDays(startOfWeek(currentWeek), day);
    const cell = { date: selectedDate, hour };

    if (selectedCells.some(selectedCell => selectedCell.date === cell.date && selectedCell.hour === cell.hour)) {
      setSelectedCells(selectedCells.filter(selectedCell => selectedCell.date !== cell.date || selectedCell.hour !== cell.hour));
    } else {
      setSelectedCells([...selectedCells, cell]);
    }
  };

  const handleCellHover = (day, hour) => {
    setHoveredCell({ day, hour });
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
  };

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
    const cellHour = Math.floor(hour / 2);
    const cellMinute = hour % 2 === 0 ? 0 : 30;
    const cellDateTime = setMinutes(setHours(date, cellHour), cellMinute);
    return isBefore(cellDateTime, currentTime);
  };

  const renderEventText = (event) => {
    return 'Đã đặt';
  };

  const renderCell = (date, hour) => {
    const cellStartTime = hour / 2;
    const cellEndTime = (hour + 1) / 2;

    const event = events.find(
      (event) =>
        isSameDay(event.date, date) &&
        ((event.start >= cellStartTime && event.start < cellEndTime) || (event.end > cellStartTime && event.end <= cellEndTime) || (event.start < cellStartTime && event.end > cellEndTime))
    );

    const isPast = isPastCell(date, hour);
    const isSelected = selectedCells.some(selectedCell => isSameDay(selectedCell.date, date) && selectedCell.hour === hour);

    let cellClass = '';
    if (event) {
      cellClass = 'bg-red-500 text-white';
    } else if (hoveredCell?.day === date.getDay() && hoveredCell?.hour === hour) {
      cellClass = 'bg-gray-200';
    } else if (isPast) {
      cellClass = 'bg-gray-300';
    } else if (isSelected) {
      cellClass = 'bg-green-500 text-white';
    }

    return (
      <td
        key={hour}
        className={`border border-gray-200 px-4 py-2 ${cellClass}`}
        onClick={() => !event && !isPast && handleCellClick(date.getDay(), hour)}
        onMouseEnter={() => handleCellHover(date.getDay(), hour)}
        onMouseLeave={handleCellLeave}
      >
        {event ? renderEventText(event) : ''}
      </td>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="paper">
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={prevWeek} variant="contained" color="primary">
          Tuần Trước
        </Button>
        <Button
          onClick={openModal}
          variant="contained"
          color="primary"
          disabled={selectedCells.length === 0}
        >
          Thêm Sự Kiện
        </Button>
        <Button onClick={nextWeek} variant="contained" color="primary">
          Tuần Sau
        </Button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">Giờ</th>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="border border-gray-200 px-4 py-2">
                {day}
                <br />
                {format(weekDates[index], 'dd/MM')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-gray-200 px-4 py-2">{hour}</td>
              {weekDates.map((date, colIndex) => renderCell(date, rowIndex))}
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onAddEvent={(title, start, end) => handleAddEvent(title, selectedCells[0].date, start, end)}
        />
      )}
    </Dialog>
  );
};

export default BookingTable;

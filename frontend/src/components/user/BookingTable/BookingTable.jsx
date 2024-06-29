import React, { useState } from 'react';
import EventModal from './EventModal';
import { Button } from '@mui/material';
import { addDays, startOfWeek, format, isBefore, isSameDay } from 'date-fns';

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const BookingTable = () => {
  const [events, setEvents] = useState([
    { title: 'Đã đặt', date: new Date(), start: 9, end: 11 },
    { title: 'Đã đặt', date: addDays(new Date(), 1), start: 9, end: 10 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null); // State để lưu ô đang hover
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  const handleAddEvent = (title, date, start, end) => {
    setEvents([...events, { title, date, start, end }]);
  };

  const openModal = (day, hour) => {
    const selectedDate = addDays(startOfWeek(currentWeek), day);
    setSelectedCell({ date: selectedDate, hour });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCell(null);
  };

  const handleCellHover = (day, hour) => {
    setHoveredCell({ day, hour });
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
  };

  const getWeekDates = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 }); // Bắt đầu tuần từ Chủ Nhật
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
    const cellDateTime = new Date(date.setHours(hour));
    return isBefore(cellDateTime, new Date()) && !isSameDay(cellDateTime, new Date());
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={prevWeek} variant="contained" color="primary">
          Tuần Trước
        </Button>
        <Button onClick={() => openModal(null, null)} variant="contained" color="primary">
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
              {weekDates.map((date, colIndex) => {
                const event = events.find(
                  (event) => isSameDay(event.date, date) && event.start <= rowIndex && event.end > rowIndex
                );
                const isPast = isPastCell(date, rowIndex);
                return (
                  <td
                    key={colIndex}
                    className={`border border-gray-200 px-4 py-2 ${event ? 'bg-red-500 text-white' : ''} ${hoveredCell?.day === colIndex && hoveredCell?.hour === rowIndex ? 'bg-gray-200' : ''} ${isPast ? 'bg-gray-300' : ''}`}
                    onClick={() => !event && !isPast && openModal(colIndex, rowIndex)}
                    onMouseEnter={() => handleCellHover(colIndex, rowIndex)}
                    onMouseLeave={handleCellLeave}
                  >
                    {event ? event.title : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCell && (
        <EventModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onAddEvent={(title, day, start, end) => handleAddEvent(title, selectedCell.date, start || selectedCell.hour, end)}
        />
      )}
    </div>
  );
};

export default BookingTable;

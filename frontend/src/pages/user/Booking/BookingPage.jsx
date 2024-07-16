import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, TextField, MenuItem, FormControl, InputLabel, Select, Button, Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import BookingTable from "../../../components/user/BookingTable/BookingTable";

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);

    const [bookModal, setBookModal] = useState(false);
    const handleOpenBook = () => setBookModal(true);
    const handleCloseBook = () => setBookModal(false);

    // useEffect(() => {
    //     // Check if the navigation is done correctly
    //     if (!location.state?.activity) {
    //         navigate('/'); // redirect to home if not navigated from a valid page
    //         return;
    //     }

    //     // Set the activity from state
    //     setActivity(location.state.activity);
    // }, [location.state, navigate]);

    // if (!activity) {
    //     return <Typography variant="h6" component="h2">Loading...</Typography>;
    // }



    const [date, setDate] = useState('');
    const [teamName, setTeamName] = useState('');
    const [phone, setPhone] = useState('');
    const [court, setCourt] = useState('Sân 1');
    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');
    const [otherInfo, setOtherInfo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const handleCheckAvailability = () => {
        // Handle check availability logic here
    };

    return (
        <form className="max-w-lg mx-auto mt-16 p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
            <div className="mb-4">
                <div>Thông tin sân:</div>
                <div>Sân 1</div>
                <div>Tên nhà thi đấu: Sân vận động Mỹ đình, Hà Nội</div>
                <div>Địa chỉ: Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội</div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Ngày đặt (*):
                </label>
                <div className="flex space-x-2 gap-5">
                    <input
                        type="date"
                        className="mt-1 w-1/2 block  p-2 border border-gray-300 rounded"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <button
                        type="button"
                        className="mt-1 bg-green-500 text-white p-2 rounded"
                        onClick={handleOpenBook}
                    >
                        Xem khung giờ trống
                    </button>
                </div>
            </div>
            <BookingTable open={bookModal} onClose={handleCloseBook}/>
            <div className="mb-4">
                <div className="flex space-x-2 gap-4">
                    <div>
                        <label className="block text-gray-700">
                            Từ (*):
                        </label>
                        <input
                            type="time"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            value={startHour}
                            onChange={(e) => setStartHour(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Đến (*):
                        </label>
                        <input
                            type="time"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            value={startHour}
                            onChange={(e) => setStartHour(e.target.value)}
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="button"
                            className="mt-1 bg-green-500 text-white p-2 rounded"
                            onClick={handleCheckAvailability}
                        >
                            Kiểm tra
                        </button>
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Lặp lại: (Lặp lại trong 1 tháng tiếp theo)
                </label>
                <select  className="mt-1 block p-2 border border-gray-300 rounded">
                    <option>
                        Không lặp lại
                    </option>
                    <option>
                        Hàng tuần
                    </option>
                    <option>
                        Hàng ngày
                    </option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Thông tin khác:
                </label>
                <textarea
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    value={otherInfo}
                    onChange={(e) => setOtherInfo(e.target.value)}
                />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Đặt sân
                </button>
            </div>
        </form>
    );
};

export default BookingPage;

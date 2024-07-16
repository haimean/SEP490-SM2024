import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Stack, Button } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ChecklistIcon from '@mui/icons-material/Checklist';
import BookingTable from "../BookingTable/BookingTable";

const CourtCard = ({ activity }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${activity.id}`);
    };

    const handleBookClick = () => {
        navigate('/booking-page', { state: { activity } });
    };

    return (
        <Card >
            <CardMedia
                component="img"
                image={activity.image}
                className={"object-cover bg-blue-200 h-40"}
            />
            <CardContent >
                <Typography component="h2" variant="h5">
                    {activity.title}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <ChecklistIcon className="text-red-600" />
                    <Typography>Thảm acrylic, Lưới dáme crax</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <PaidOutlinedIcon className="text-red-600" />
                    <Typography>Giá: {activity.price}</Typography>
                </Stack>
                <div className="mt-4 space-x-4">
                    <Button
                        variant="contained"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        onClick={handleBookClick}
                    >
                        Đặt sân
                    </Button>
                    <Button
                        variant="contained"
                        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                        onClick={handleClick}
                    >
                        Xem chi tiết
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

CourtCard.propTypes = {
    activity: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
    }).isRequired,
};

export default CourtCard;

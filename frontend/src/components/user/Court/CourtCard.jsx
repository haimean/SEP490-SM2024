import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Stack, Button, Tooltip } from "@mui/material";
import ChecklistIcon from '@mui/icons-material/Checklist';
import BookingModal from "../BookingTable/BookingModal";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoginModal from "../../auth/LoginModal";
import { toast } from "react-toastify";

const CourtCard = ({ court, image }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const user = useSelector((state) => state.user.user);

    const handleBookClick = () => {
        if (user) {
            setOpenModal(true);
        } else {
            toast.error("Bạn chưa đăng nhập!");
            setOpenLoginModal(true);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCloseLoginModal = () => {
        setOpenLoginModal(false);
    };

    return (
        <Card>
            <CardMedia
                component="img"
                image={image}
                className={"object-cover bg-blue-200 h-40"}
            />
            <CardContent>
                <Tooltip title={court.name}>
                    <Typography component="h2" variant="h5" className="truncate">
                        {court.name}
                    </Typography>
                </Tooltip>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title={court?.TypeCourt?.description}>
                        <Typography className="truncate">Mô tả: {court?.TypeCourt?.description}</Typography>
                    </Tooltip>
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
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        component={Link}
                        to={`/branch/4/court/${court.id}`}
                    >
                        Xem chi tiết
                    </Button>
                </div>
            </CardContent>
            <BookingModal open={openModal} onClose={handleCloseModal} court={court} />
            <LoginModal open={openLoginModal} onClose={handleCloseLoginModal} />
        </Card>
    );
};

export default CourtCard;

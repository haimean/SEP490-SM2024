import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Stack, Button } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import testImg from "D:/1_2024-05-SEM9/DOAN/scl.jpg";
import { format, parseISO } from 'date-fns';

const PostCard = ({ activity }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${activity.id}`);
    };

    const formattedDate = format(parseISO(activity.dateTime), 'yyyy-MM-dd');
    const formattedStartTime = format(parseISO(activity.startTime), 'HH:mm');
    const formattedEndTime = format(parseISO(activity.endTime), 'HH:mm');
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(activity.price);
    return (
        <Card className="">
            <CardMedia
                component="img"
                sx={{ height: 200 }}
                // image={activity.Court.Branches.image}
                image={testImg}
                alt={activity.bookingInfo.name}
            />
            <CardContent className="">
                <Typography component="h2" variant="h5">
                    {activity.bookingInfo.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <LocationOnOutlinedIcon className="text-red-600" />
                    <Typography>{activity.Court.Branches.address.wards},&nbsp;
                    {activity.Court.Branches.address.districts},&nbsp;
                    {activity.Court.Branches.address.provinces}, 
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <EventIcon className="text-red-600" />
                    <Typography>{formattedDate}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <AccessTimeIcon className="text-red-600" />
                    <Typography>{formattedStartTime} - {formattedEndTime}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <PaidOutlinedIcon className="text-red-600" />
                    <Typography>{formattedPrice}</Typography>
                </Stack>
                                {/* <Typography >
                    Trình độ: {activity.level}
                </Typography> */}
                <div className="space-x-4 flex justify-center">
                    <Button
                        variant="contained"
                        className="bg-blue-500 hover:bg-blue-700 text-white rounded"
                    >
                        Gửi lời mời tham gia
                    </Button>
                    <Button
                        variant="contained"
                        className="bg-green-500 hover:bg-green-700 text-white rounded"
                        onClick={handleClick}
                    >
                        Xem chi tiết
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

PostCard.propTypes = {
    activity: PropTypes.shape({
        id: PropTypes.number.isRequired,
        bookingInfo: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
        Court: PropTypes.shape({
            Branches: PropTypes.shape({
                address: PropTypes.shape({
                    wards: PropTypes.string.isRequired,
                    districts: PropTypes.string.isRequired,
                    provinces: PropTypes.string.isRequired,
                }).isRequired,
            }).isRequired,
        }).isRequired,
        dateTime: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default PostCard;

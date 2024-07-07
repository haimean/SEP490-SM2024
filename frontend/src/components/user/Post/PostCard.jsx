import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Stack, Button } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

const PostCard = ({ activity }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${activity.id}`);
    };

    return (
        <Card className="flex" >
            <CardMedia
                component="img"
                sx={{ width: 200 }}
                image={activity.image}
                alt={activity.title}
            />
            <CardContent className="flex flex-col">
                <Typography component="h2" variant="h5">
                    {activity.title}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <LocationOnOutlinedIcon className="text-red-600" />
                    <Typography>{activity.location}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <EventIcon className="text-red-600" />
                    <Typography>{activity.date}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <AccessTimeIcon className="text-red-600" />
                    <Typography>{activity.time}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <PaidOutlinedIcon className="text-red-600" />
                    <Typography>{activity.price}</Typography>
                </Stack>
                <Typography >
                    Trình độ: {activity.level}
                </Typography>
                <div className="mt-4 space-x-4">
                    <Button
                        variant="contained"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                        Gửi lời mời tham gia
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

PostCard.propTypes = {
    activity: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
    }).isRequired,
};

export default PostCard;

import React from "react";
import { Card, CardContent, CardMedia, Typography, Stack } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
const BranchCard = ({ name, location, time, image }) => {
    //image là link ảnh

    return (
        <Card
            sx={{
                boxShadow: "0 3px 3px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
                },
            }}
        >
            <CardMedia
                component="img"
                image={image}
                alt={name}
                className={"object-cover bg-blue-200 h-40"}
            />
            <CardContent>
                <Typography variant="h6" component="div" fontWeight={700}>
                    {name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <LocationOnOutlinedIcon className="text-red-600" />
                    <Typography>{location}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default BranchCard;

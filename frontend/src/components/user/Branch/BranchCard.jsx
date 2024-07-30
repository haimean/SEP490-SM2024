import React from "react";
import { Card, CardContent, CardMedia, Typography, Stack, Tooltip } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
const BranchCard = ({ name, location, image, onClick  }) => {
    //image là link ảnh

    return (
        <Card
        onClick={onClick}
            sx={{
                boxShadow: "0 3px 3px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
                },
            }}
             className="cursor-pointer"
        >
            <CardMedia
                component="img"
                image={image}
                alt={name}
                style={{ height: '250px'}}
                className={"object-cover bg-blue-200 h-40"}
            />
            <CardContent>
                <Tooltip title={name}>
                <Typography variant="h6" component="div" fontWeight={700} className="truncate">
                    {name}
                </Typography>
                </Tooltip>
                <Stack direction="row" alignItems="center" spacing={1} className="mt-2">
                    <LocationOnOutlinedIcon className="text-red-600" />
                    <Tooltip title={location}>
                    <Typography className="truncate">{location}</Typography>
                    </Tooltip>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default BranchCard;

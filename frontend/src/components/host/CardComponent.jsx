/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Tooltip,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StadiumIcon from "@mui/icons-material/Stadium";
import haversine from "haversine";

import { useEffect, useState } from "react";
const CardComponent = ({
  name,
  locations,
  time,
  image,
  role,
  branch,
  id,
  isAccept,
  onDeleteBranch,
}) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  const distance = haversine(
    {
      latitude: branch?.address?.latitude || "21.013393218627524",
      longitude: branch?.address?.longitude || "105.52526950492785",
    },
    {
      latitude: location?.latitude || "21.013393218627524",
      longitude: location?.longitude || "105.52526950492785",
    }
  );
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      const truncated = text.substring(0, maxLength).trim();
      return truncated + "...";
    }
    return text;
  };
  const cardContent = (
    <>
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          height: 300,
          objectFit: "cover",
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            component="div"
            fontWeight={700}
            sx={{
              height: "3em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            <Tooltip title={name}>{name}</Tooltip>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {locations}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1} className="my-1">
          <DirectionsRunIcon className="text-red-600" />
          <Typography component="h6" variant="h6">
            Vị trí cách bạn {distance ? distance.toFixed(2) : "~"} km
          </Typography>
        </Stack>
        <Tooltip title={branch?.address?.detail}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="truncate mb-1"
          >
            <LocationOnOutlinedIcon className="text-red-600" />
            <Typography>{truncateText(branch?.address?.detail, 53)}</Typography>
          </Stack>
        </Tooltip>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <AccessTimeIcon className="text-red-600" />
          <Typography>
            Giờ hoạt động: {time} - {branch?.closingHours}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <StadiumIcon className="text-red-600" />
          <Typography>Số sân: {branch?.court?.length} sân</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <LocalPhoneIcon className="text-red-600" />
          <Typography>Số điện thoại liên hệ: {branch?.phone}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <MailIcon className="text-red-600" />
          <Typography>Email: {branch?.email}</Typography>
        </Stack>

        {role === "HOST" && (
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              e.preventDefault();
              onDeleteBranch(id);
            }}
          >
            Xóa branch
          </Button>
        )}
      </CardContent>
    </>
  );

  const cardWrapper = isAccept ? (
    <Link to={`/${role === "HOST" ? "host" : "player"}/branch/${id}`}>
      {cardContent}
    </Link>
  ) : (
    <Box>{cardContent}</Box>
  );

  return (
    <Card
      sx={{
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
        },
        display: "flex",
        flexDirection: "column",
        height: "100%",
        opacity: isAccept ? 1 : 0.6,
      }}
    >
      {cardWrapper}
    </Card>
  );
};

export default CardComponent;

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Stack,
  Tooltip,
  Link,
} from "@mui/material";
import { LocationOn, Subject } from "@mui/icons-material";
import RightSectionDetailPage from "./RightSectionDetailPage";
import RightSectionHost from "./RightSectionHost";

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StadiumIcon from "@mui/icons-material/Stadium";
import DescriptionIcon from "@mui/icons-material/Description";
import haversine from "haversine";
import Map from "../common/Map";
const DetailPageCp = ({
  name,
  image,
  locations,
  openingHours,
  closingHours,
  description,
  map,
  id,
  role,
  type,
  branch,
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
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            className={"object-cover bg-blue-200 h-96"}
            image={image}
            alt="Activity image"
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {name}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              className="my-1"
            >
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
                <Typography>{branch?.address?.detail}</Typography>
              </Stack>
            </Tooltip>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              className="mb-1"
            >
              <AccessTimeIcon className="text-red-600" />
              <Typography>
                Giờ hoạt động: {branch?.openingHours} - {branch?.closingHours}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              className="mb-1"
            >
              <StadiumIcon className="text-red-600" />
              <Typography>Số sân: {branch?.court?.length} sân</Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              className="mb-1"
            >
              <LocalPhoneIcon className="text-red-600" />
              <Typography>Số điện thoại liên hệ: {branch?.phone}</Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              className="mb-1"
            >
              <MailIcon className="text-red-600" />
              <Typography>Email: {branch?.email}</Typography>
            </Stack>
            <Typography variant="h6" gutterBottom>
              Mô tả thêm
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              className="mb-1"
            >
              <DescriptionIcon className="text-red-600" />
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </Stack>
          </CardContent>
        </Card>

        {map && (
          <Card>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6">Bản đồ</Typography>
                <Link
                  href={`https://www.google.com/maps?q=${branch?.address?.latitude},${branch?.address?.longitude}&ll=${branch?.address?.latitude},${branch?.address?.longitude}&z=17`}
                  variant="body2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outlined" startIcon={<LocationOn />}>
                    Xem vị trí
                  </Button>
                </Link>
              </Box>
              <Box
                sx={{
                  height: "400px",
                  width: "100%",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <Map
                  lat={branch?.address?.latitude}
                  lng={branch?.address?.longitude}
                  address={branch?.address?.detail}
                />
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
      {role == "USER" ? (
        <RightSectionDetailPage />
      ) : (
        <RightSectionHost id={id} type={type} />
      )}
    </Grid>
  );
};

export default DetailPageCp;

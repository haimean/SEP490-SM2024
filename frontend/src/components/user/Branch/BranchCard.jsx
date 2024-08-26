/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Tooltip,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StadiumIcon from "@mui/icons-material/Stadium";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import haversine from "haversine";
import { useEffect, useState } from "react";

const BranchCard = ({ name, branchLocation, image, branch, onClick }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(false);
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
          console.log("🚀 ========= error:", error?.message);
          setError(true);
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
        style={{ height: "250px" }}
        className={"object-cover bg-blue-200 h-40"}
      />
      <CardContent>
        <Tooltip title={name}>
          <Typography
            variant="h6"
            component="div"
            fontWeight={700}
            className="truncate"
          >
            {name}
          </Typography>
        </Tooltip>
        <Stack direction="row" alignItems="center" spacing={1}>
          <DirectionsRunIcon className="text-red-600" />
          <Typography component="h6" variant="h6">
            Vị trí cách bạn {!error ? distance?.toFixed(2) : "~"} km
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mt-2">
          <PersonIcon className="text-red-600" />
          <Tooltip title={branch?.account?.user?.fullName || "Chưa có tên"}>
            <Typography className="truncate">
              {branch?.account?.user?.fullName || "Chưa có tên"}
            </Typography>
          </Tooltip>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mt-1">
          <LocationOnOutlinedIcon className="text-red-600" />
          <Tooltip title={branchLocation}>
            <Typography className="truncate">{branchLocation}</Typography>
          </Tooltip>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <AccessTimeIcon className="text-red-600" />
          <Typography>
            Giờ hoạt động: {branch?.openingHours} - {branch?.closingHours}
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
      </CardContent>
    </Card>
  );
};

export default BranchCard;

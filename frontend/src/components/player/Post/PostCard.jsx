/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StadiumIcon from "@mui/icons-material/Stadium";
import { useEffect, useState } from "react";
import haversine from "haversine";
import { Group } from "@mui/icons-material";
const PostCard = ({
  post,
  postId,
  owner,
  branchName,
  courtName,
  court,
  time,
  image,
  isLarge,
}) => {
  console.log("🚀 ========= post:", post);
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
      latitude: post?.address?.latitude || "21.013393218627524",
      longitude: post?.address?.longitude || "105.52526950492785",
    },
    {
      latitude: location?.latitude || "21.013393218627524",
      longitude: location?.longitude || "105.52526950492785",
    }
  );
  //isLarge true thì hiển thị ảnh to
  const parseDate = (isoString) => {
    const date = new Date(isoString);

    // Lấy ngày, tháng, và năm từ đối tượng Date
    const day = date.getUTCDate().toString().padStart(2, "0"); // Thêm số 0 vào trước nếu day có 1 chữ số
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Thêm 1 vào tháng vì getUTCMonth() trả về giá trị từ 0-11
    const year = date.getUTCFullYear();

    // Ghép ngày, tháng, và năm thành chuỗi định dạng "dd/MM/yyyy"
    return `${day}/${month}/${year}`;
  };
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(post?.booking?.price || 0);
  return (
    <Link to={`post/${postId}`}>
      <Card
        className={`shadow-lg ${
          isLarge ? "h-full" : ""
        } hover:shadow-xl hover:scale-[1.02]`}
        sx={{
          boxShadow: 2,
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease-in-out",
            transitionDuration: 300,
          },
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={court}
          className={`object-cover ${isLarge ? "h-96" : "h-40"} bg-blue-200`}
        />
        <CardContent sx={isLarge && { p: 3, height: "full" }}>
          <Typography
            variant={isLarge ? "h4" : "h5"}
            component="div"
            fontWeight={700}
            my={isLarge ? 4 : 0}
          >
            {owner}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="my-1"
          >
            <DirectionsRunIcon className="text-red-600" />
            <Typography component="h6" variant="h6">
              Vị trí cách bạn {!error ? distance?.toFixed(2) : "~"} km
            </Typography>
          </Stack>
          <Tooltip title={post?.booking?.Court?.Branches?.address?.detail}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              className="truncate mb-1"
            >
              <LocationOnOutlinedIcon className="text-red-600" />
              <Typography>
                {post?.booking?.Court?.Branches?.address?.detail ||
                  "Chưa có thông tin"}
              </Typography>
            </Stack>
          </Tooltip>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="mb-1"
          >
            <AccountBalanceIcon className="text-red-600" />
            <Typography>
              {`Chi nhánh: ${branchName}` || "Chưa có thông tin"}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="mb-1"
          >
            <StadiumIcon className="text-red-600" />
            <Typography>{courtName || "Chưa có thông tin"}</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="mb-1"
          >
            <EventIcon className="text-red-600" />
            <Typography>
              {parseDate(post?.booking?.startTime || new Date())}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="mb-1"
          >
            <AccessTimeIcon className="text-red-600" />
            <Typography>
              Giờ bắt đầu:{" "}
              {time
                ? format(parseISO(time), "HH:mm - dd/MM/yyyy", { locale: vi })
                : ""}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="mb-1"
          >
            <PaidOutlinedIcon className="text-red-600" />
            <Typography>{`Phí thuê sân: ${formattedPrice}`}</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="mb-1"
          >
            <Group className="text-red-600" />
            <Typography>
              Tuyển {post?.numberMember || 1} người (Hiện có:{" "}
              {post?.invitation?.length || 0}/{post?.numberMember || 1})
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;

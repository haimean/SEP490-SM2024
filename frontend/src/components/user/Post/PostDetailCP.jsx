import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Link,
} from "@mui/material";
import {
  LocationOn,
  CalendarToday,
  Group,
  School,
  AttachMoney,
  SportsBasketball,
} from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EventIcon from "@mui/icons-material/Event";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";

import Map from "../../common/Map";
import FormatTime from "../../../utils/user/formatTime";
import PostRightCP from "./PostRightCP";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import haversine from "haversine";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { getRatingDescription } from "../../../utils/user/GetRatingDescription";

const PostDetailCP = ({ post, postId }) => {
  console.log("🚀 ========= post:", post);
  const [location, setLocation] = useState(null);
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
          console.log("🚀 ========= error:", error.message);
        }
      );
    } else {
      toast.warning("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  if (!post?.booking?.Court) {
    return "Không tồn tại bài này";
  }

  const { Court } = post.booking;
  const { TypeCourt } = Court;
  const locations = post?.booking?.Court?.Branches?.address?.detail;

  // const formattedDate = format(parseISO(post.booking.dateTime), "yyyy-MM-dd");
  const formattedStartTime = FormatTime(post?.booking?.startTime);
  const formattedEndTime = FormatTime(post?.booking?.endTime);
  const date = `${formattedStartTime} - ${formattedEndTime}`;
  const address = post?.booking?.Court?.Branches?.address;
  console.log("🚀 ========= address:", address);

  const renderInfoItem = (Icon, text) => (
    <Box display="flex" alignItems="center" mb={1}>
      <Icon className="text-red-600" />
      <Typography variant="body2" ml={1}>
        {text}
      </Typography>
    </Box>
  );
  const distance = haversine(
    {
      latitude:
        post?.booking?.Court?.Branches?.address?.latitude ||
        "21.013393218627524",
      longitude:
        post?.booking?.Court?.Branches?.address?.longitude ||
        "105.52526950492785",
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
            image={
              TypeCourt?.image !== null
                ? TypeCourt?.image
                : "https://via.placeholder.com/600x400"
            }
            alt="Activity image"
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {Court?.name}
            </Typography>
            {renderInfoItem(
              DirectionsRunIcon,
              `Vị trí cách bạn ${distance ? distance.toFixed(2) : "~"} km` ||
                "Không có thông tin"
            )}
            {renderInfoItem(LocationOnOutlinedIcon, locations)}
            {renderInfoItem(
              EventIcon,
              format(new Date(post?.booking?.startTime), "dd/MM/yyyy")
            )}
            {renderInfoItem(AccessTimeIcon, date)}
            {renderInfoItem(
              Group,
              `Cần tuyển ${post?.numberMember} ${
                post?.memberPost[0]?.genderPost == "MALE"
                  ? "nam"
                  : post?.memberPost[0]?.genderPost == "FEMALE"
                  ? "nữ"
                  : "giới tính khác"
              }` || "Không có thông tin"
            )}
            {renderInfoItem(
              School,
              `Trình độ: ${getRatingDescription(post?.memberPost[0]?.level)}` ||
                "Không có thông tin"
            )}
            {renderInfoItem(
              PaidOutlinedIcon,
              `Phí giao lưu: ${post?.memberPost[0]?.price} đồng` ||
                "Không có thông tin"
            )}
          </CardContent>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Mô tả thêm
            </Typography>
            {renderInfoItem(
              SportsBasketball,
              post?.description || "Không có thông tin"
            )}
          </CardContent>
        </Card>
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
                href={`https://www.google.com/maps?q=${address?.latitude},${address?.longitude}&ll=${address?.latitude},${address?.longitude}&z=17`}
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
                lat={address?.latitude}
                lng={address?.longitude}
                address={address?.detail}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <PostRightCP
        user={post?.booking?.bookingInfo}
        post={post}
        postId={postId}
        isOwner={true}
      />
    </Grid>
  );
};

export default PostDetailCP;

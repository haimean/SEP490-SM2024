import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Button,
  Tooltip,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { format, parseISO } from "date-fns";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";

const PostCard = ({ activity }) => {
  const testImg = "https://via.placeholder.com/200";
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${activity?.post?.id}`);
  };

  const handleJoin = () => {
    join(activity);
  };
  const join = async (activity) => {
    try {
      const response = await CallApi(
        "/api/user/invitation/requests-to-match",
        "post",
        {
          postId: activity?.post?.id,
        },
        {}
      );
      toast.success("Gửi lời mời thành công!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
    }
  };

  //   const formattedDate = format(parseISO(activity?.dateTime), "yyyy-MM-dd");
  const formattedStartTime = format(parseISO(activity?.startTime), "HH:mm");
  const formattedEndTime = format(parseISO(activity?.endTime), "HH:mm");
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(activity?.price);
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      const truncated = text.substring(0, maxLength).trim();
      return truncated + "...";
    }
    return text;
  };
  return (
    <Card className="">
      <CardMedia
        component="img"
        sx={{ height: 200 }}
        // image={activity.Court.Branches.image}
        image={testImg}
        alt={activity?.bookingInfo?.name}
      />
      <CardContent className="">
        <Tooltip title={activity?.bookingInfo?.name}>
          <Typography component="h2" variant="h5" className="truncate">
            {activity?.bookingInfo?.name}
          </Typography>
        </Tooltip>
        <Tooltip title={activity?.Court?.Branches?.address?.detail}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="truncate"
          >
            <LocationOnOutlinedIcon className="text-red-600" />
            <Typography>
              {truncateText(activity?.Court?.Branches?.address?.detail, 53)}
            </Typography>
          </Stack>
        </Tooltip>
        <Stack direction="row" alignItems="center" spacing={1}>
          <EventIcon className="text-red-600" />
          <Typography>{activity?.dateTime}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <AccessTimeIcon className="text-red-600" />
          <Typography>
            {formattedStartTime} - {formattedEndTime}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PaidOutlinedIcon className="text-red-600" />
          <Typography>{formattedPrice}</Typography>
        </Stack>
        <div className="space-x-4 flex justify-center">
          <Button
            variant="contained"
            className="bg-blue-500 hover:bg-blue-700 text-white rounded"
            onClick={handleJoin}
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

export default PostCard;

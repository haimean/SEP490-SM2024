/* eslint-disable react/prop-types */
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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginModal from "../../auth/LoginModal";
import haversine from "haversine";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StadiumIcon from "@mui/icons-material/Stadium";
import { Group } from "@mui/icons-material";

const PostCard = ({ activity, updateStatusInvitation }) => {
  // console.log("🚀 ========= activity:", activity);
  const acceptCount = activity?.post?.invitation?.filter(
    (invite) => invite?.status === "ACCEPT"
  ).length;
  const testImg = "https://via.placeholder.com/200";
  const navigate = useNavigate();
  const [accountId, setAccountId] = useState(null);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    // Lấy accountId từ localStorage
    const storedAccountId = localStorage.getItem("accountId");
    setAccountId(storedAccountId);
  }, []);
  const handleClick = () => {
    navigate(`/post/${activity?.post?.id}`);
  };

  const handleJoin = async () => {
    if (user) {
      await join(activity);
    } else {
      toast.error("Bạn chưa đăng nhập!");
      setOpenLoginModal(true);
    }
  };
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };
  const join = async (activity) => {
    try {
      await CallApi("/api/user/invitation/invite", "post", {
        postId: activity?.post?.id,
      });
      updateStatusInvitation();
      // TODO: Khi xin vaof thanfh coong -> update theme 1 truowngf owr
      toast.success("Xin tham gia thành công!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
    }
  };

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
  const checkRequestInvitation = (data) => {
    // Kiểm tra nếu data không phải là một mảng hoặc là null/undefined
    if (!Array.isArray(data)) {
      return false;
    }

    // Kiểm tra nếu dữ liệu không có accountId
    if (isNaN(accountId)) {
      return false;
    }

    // Sử dụng `some` để kiểm tra nếu bất kỳ invitationAccountId nào khớp với storedAccountId
    return data.some((invitation) => {
      const invitationAccountId = invitation?.userAvailability?.accountId;
      return invitationAccountId === Number(accountId);
    });
  };
  const [detail, setDetail] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const detailUser = async () => {
    try {
      const result = await CallApi(
        "/api/user/invitation/available-of-user",
        "post",
        {
          postId: activity?.post?.id,
        }
      );
      setDetail(result?.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  useEffect(() => {
    detailUser();
  }, []);
  const parseDate = (isoString) => {
    const date = new Date(isoString);

    // Lấy ngày, tháng, và năm từ đối tượng Date
    const day = date.getUTCDate().toString().padStart(2, "0"); // Thêm số 0 vào trước nếu day có 1 chữ số
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Thêm 1 vào tháng vì getUTCMonth() trả về giá trị từ 0-11
    const year = date.getUTCFullYear();

    // Ghép ngày, tháng, và năm thành chuỗi định dạng "dd/MM/yyyy"
    return `${day}/${month}/${year}`;
  };
  const distance = haversine(
    {
      latitude:
        activity?.Court?.Branches?.address?.latitude || "21.013393218627524",
      longitude:
        activity?.Court?.Branches?.address?.longitude || "105.52526950492785",
    },
    {
      latitude: location?.latitude || "21.013393218627524",
      longitude: location?.longitude || "105.52526950492785",
    }
  );
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
          console.log("🚀 ========= error:", error);
          setError(true);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ height: 200 }}
        image={activity?.Court?.TypeCourt?.image || testImg}
        alt={activity?.bookingInfo?.name}
      />
      <CardContent className="">
        <Tooltip title={activity?.post?.title}>
          <Typography component="h2" variant="h5" className="truncate">
            {activity?.post?.title}
          </Typography>
        </Tooltip>
        <Stack direction="row" alignItems="center" spacing={1} className="my-1">
          <DirectionsRunIcon className="text-red-600" />
          <Typography component="h6" variant="h6">
            Vị trí cách bạn {!error ? distance.toFixed(2) : "~"} km
          </Typography>
        </Stack>
        <Tooltip title={activity?.Court?.Branches?.address?.detail}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="truncate mb-1"
          >
            <LocationOnOutlinedIcon className="text-red-600" />
            <Typography>
              {truncateText(activity?.Court?.Branches?.address?.detail, 53)}
            </Typography>
          </Stack>
        </Tooltip>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <EventIcon className="text-red-600" />
          {/* <Typography>{parseDate(activity?.startTime)}</Typography> */}
          <Typography>
            {format(parseISO(activity?.startTime), "yyyy-MM-dd")}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <AccountBalanceIcon className="text-red-600" />
          <Typography>{`Cơ sở: ${activity?.Court?.Branches?.name}`}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <StadiumIcon className="text-red-600" />
          <Typography>{activity?.Court?.name}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <AccessTimeIcon className="text-red-600" />
          <Typography>
            {formattedStartTime} - {formattedEndTime}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <PaidOutlinedIcon className="text-red-600" />
          <Typography>{`Phí thuê sân: ${formattedPrice}`}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <Group className="text-red-600" />
          <Typography>
            Tuyển {activity?.post?.numberMember} người (Hiện có: {acceptCount}/
            {activity?.post?.numberMember})
          </Typography>
        </Stack>
        <div className="space-x-4 flex justify-center mt-2">
          <Button
            variant="contained"
            className="bg-blue-500 hover:bg-blue-700 text-white rounded"
            onClick={handleJoin}
            disabled={
              acceptCount == activity?.post?.numberMember ||
              activity?.isInvitation
            }
          >
            {acceptCount == activity?.post?.numberMember
              ? "Sân đã đủ người"
              : !activity?.isInvitation
              ? "Xin tham gia"
              : "Đã xin tham gia"}
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
      <LoginModal open={openLoginModal} onClose={handleCloseLoginModal} />
    </Card>
  );
};

export default PostCard;

import { Button, Card, Grid, Typography } from "@mui/material";
import haversine from "haversine";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getTimeSinceCreation } from "../../../utils/getTimeSinceCreation";
import FormatTime from "../../../utils/user/formatTime";

export default function RequestListJoinCp({ item, changeStatusInvitation }) {
  const [location, setLocation] = React.useState(null);
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
          toast.warning(error.message);
        }
      );
    } else {
      toast.warning("Không lấy được vị trí hiện tại");
    }
  };
  const distance = (latitude, longitude) => {
    return haversine(
      {
        latitude: latitude || "21.013393218627524",
        longitude: longitude || "105.52526950492785",
      },
      {
        latitude: location?.latitude || "21.013393218627524",
        longitude: location?.longitude || "105.52526950492785",
      }
    );
  };
  console.log(
    "🚀 ========= distance:",
    distance("21.013393218627524", "105.52526950492785")
  );
  React.useEffect(() => {
    getLocation();
  }, []);
  return (
    <Grid key={item?.id} item xs={12}>
      <Card variant="outlined" className="p-4 pb-2">
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Link
              to={`/post/${item?.Post?.id}`}
              className="hover:underline hover:cursor-pointer"
            >
              <Typography variant="subtitle1" color="primary">
                {item?.Post?.title}
                {/* Tên bài post: {item?.Post?.booking?.bookingInfo?.name} */}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={4}>
            {item?.status == "NEW" && (
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                Đang yêu cầu vào trận
              </span>
            )}
            {item?.status == "ACCEPT" && (
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                Đã tham gia
              </span>
            )}
            {item?.status == "NOACCEPT" && (
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                Từ chối tham gia
              </span>
            )}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Vị trí cách bạn:{" "}
              {distance(
                item?.Post?.booking?.Court?.Branches?.address?.latitude,
                item?.Post?.booking?.Court?.Branches?.address?.longitude
              ) != null
                ? distance(
                    item?.Post?.booking?.Court?.Branches?.address?.latitude,
                    item?.Post?.booking?.Court?.Branches?.address?.longitude
                  ).toFixed(2)
                : "~"}{" "}
              km
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {`Thời gian xin vào trận: ${getTimeSinceCreation(
                item?.updatedAt
              )}`}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Liên hệ: {item?.Post?.booking?.bookingInfo?.numberPhone}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {`Giờ chơi: ${FormatTime(
                item?.Post?.booking?.startTime
              )} - ${FormatTime(item?.Post?.booking?.endTime)}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {`Địa chỉ: ${item?.Post?.booking?.Court?.Branches?.address?.detail}`}
            </Typography>
          </Grid>
          {item?.status == "NEW" && (
            <Grid item xs={12}>
              <Typography
                component="span"
                variant="body2"
                color="text.primary"
                className="flex justify-end"
              >
                <Button
                  onClick={() =>
                    changeStatusInvitation(item?.id, "CANCEL", "Hủy lời mời")
                  }
                  color="error"
                  variant="contained"
                  size="small"
                >
                  Hủy yêu cầu
                </Button>
              </Typography>
            </Grid>
          )}
          {item?.status == "ACCEPT" && (
            <Grid item xs={12}>
              <Typography
                component="span"
                variant="body2"
                color="text.primary"
                className="flex justify-end"
              >
                <Button
                  onClick={() =>
                    changeStatusInvitation(
                      item?.id,
                      "CANCEL",
                      "Hủy tham gia trận đấu"
                    )
                  }
                  color="error"
                  variant="contained"
                  size="small"
                >
                  Hủy yêu cầu
                </Button>
              </Typography>
            </Grid>
          )}
        </Grid>
      </Card>
    </Grid>
  );
}

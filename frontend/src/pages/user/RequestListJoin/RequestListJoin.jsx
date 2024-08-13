import * as React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import CallApi from "../../../service/CallAPI";
import { getTimeSinceCreation } from "../../../utils/getTimeSinceCreation";
import Loading from "../../../components/common/Loading";
import { Button, Card, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FormatTime from "../../../utils/user/formatTime";
import haversine from "haversine";
import useDialogConfirm from "../../../hooks/useDialogConfirm";

export default function RequestListJoin() {
  const [requestList, setRequestList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

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
  const api = "/api/user/user-available/request-list-join";
  const apiInvitation = "/api/user/invitation/update";

  const getRequestList = async () => {
    setIsLoading(true);
    try {
      const data = await CallApi(api, "get");
      console.log("🚀 ========= data:", data);
      setRequestList(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  const { openDialog, DialogComponent } = useDialogConfirm();

  const changeStatusInvitation = async (id, status, reason) => {
    console.log("🚀 ========= id, status, reason:", id, status, reason);
    try {
      await openDialog(
        "Bạn có chắc chắn chắn hủy trận đấu không?",
        async () => {
          await CallApi(apiInvitation, "post", {
            invitationId: id,
            status: status,
            reasonCancel: reason,
          });
          getRequestList();
          toast.success("Hủy thành công");
        }
      );
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };
  React.useEffect(() => {
    getRequestList();
  }, []);
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
    <List
      sx={{
        width: "100%",
        paddingLeft: "15%",
        paddingRight: "15%",
        bgcolor: "background.paper",
        paddingTop: "5%",
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={1}>
          <Typography variant="h5" component="h6">
            Lịch sử xin vào trận
          </Typography>
          {requestList?.map((item) => (
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
                    {item?.status == "NEW" ? (
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        Đang yêu cầu vào trận
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        Đã tham gia
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
                            item?.Post?.booking?.Court?.Branches?.address
                              ?.latitude,
                            item?.Post?.booking?.Court?.Branches?.address
                              ?.longitude
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
                            "Hủy lời mời"
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
                </Grid>
              </Card>
            </Grid>
          ))}
          <DialogComponent />
        </Grid>
      )}
    </List>
  );
}
